import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';
import * as firebase from 'firebase/app';

import { QueuesService, IQueueItem, IQueuesResponse } from '../../services/queues.service';
import { HistoryService, IHistoryItem } from '../../services/history.service';
import { IRemoveQueueItemEvent } from '../../components/queue-video/queue-video.component';

@Component({
	selector: 'app-queue-list',
	templateUrl: './queue.page.html',
	styleUrls: ['./queue.page.scss'],
	animations: [
		// nice stagger effect when showing existing elements
		trigger('list', [
			transition(':enter', [
				// child animation selector + stagger
				query('@items',
					stagger(300, animateChild())
				)
			]),
		]),
		trigger('items', [
			// cubic-bezier for a tiny bouncing feel
			transition(':enter', [
				style({transform: 'scale(0.5)', opacity: 0}),
				animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
					style({transform: 'scale(1)', opacity: 1}))
			]),
			transition(':leave', [
				style({transform: 'scale(1)', opacity: 1, height: '*'}),
				animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
					style({transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px'}))
			]),
		])
	]
})
export class QueuePage implements OnInit {
	activeQueue: IQueuesResponse = {
		queueType: null,
		videoQueueLen: null
	};
	limit = 2;
	queue: IQueueItem[];
	queueSnapshot: QueryDocumentSnapshot<IQueueItem>[];
	loading = true;
	private cardsHeightIsChecked = false;

	constructor(
		private queuesService: QueuesService,
		private historyService: HistoryService,
		private sanitizer: DomSanitizer,
		private router: Router,
		private route: ActivatedRoute,
		private r: ElementRef,
		private actionSheetController: ActionSheetController
	) {
	}

	async ngOnInit(): Promise<void> {
		this.activeQueue.queueType = this.route.snapshot.params.id;

		if (this.activeQueue.queueType) {
			this.initLoad();

			// check for queue change
			this.queuesService
				.getQueueByIdSub(this.activeQueue.queueType)
				.subscribe((activeQueue: IQueuesResponse) => {
					this.activeQueue = activeQueue;
					this.checkInitHeight();
				});

			this.loading = false;
		}
	}

	async initLoad(): Promise<void> {
		const collection = this.queuesService.getQueueListById(this.activeQueue.queueType, this.limit);
		const docs: QueryDocumentSnapshot<any>[] = (await collection.toPromise()).docs;

		// get snapshot and values
		// snapshot need for lazyloading and removing items
		this.queueSnapshot = docs;
		this.queue = docs.map(item => item.data());
	}

	async removeItem(e: IRemoveQueueItemEvent): Promise<void> {
		const remEl = e.event.target as HTMLElement;
		remEl.classList.add('on-removing');

		const actionSheet = await this.actionSheetController.create({
			header: 'Точно удалить?',
			buttons: [{
				text: 'Да',
				role: 'destructive',
				icon: 'trash',
				handler: () => {
					const removedSnapshot = this.queueSnapshot.splice(e.index, 1)[0];
					const removed: IHistoryItem = {
						...this.queue.splice(e.index, 1)[0],
						date_removed: firebase.firestore.FieldValue.serverTimestamp()
					};

					this.historyService.pushToHistory(removed);
					this.queuesService.deleteQueueItem(this.activeQueue.queueType, removedSnapshot);

					remEl.classList.remove('on-removing');
				}
			}, {
				text: 'Отмена',
				icon: 'close',
				role: 'cancel',
				handler: () => {
					remEl.classList.remove('on-removing');
				}
			}]
		});
		await actionSheet.present();
	}

	onLastVideoLoad(): void {
		// onLastVideoLoad need to checkInitHeight
		if (!this.cardsHeightIsChecked) {
			this.checkInitHeight();
		}
	}

	checkInitHeight(): void {
		setTimeout(() => {
			const cards = this.r.nativeElement.querySelector('#cards');

			if (cards) {
				const wp = cards.closest('ion-content');

				if (cards && cards.clientHeight < wp.clientHeight) {
					// if cards height less than screen we need to load more
					this.loadMore();
					this.cardsHeightIsChecked = true;
				}
			} else {
				// in case if we have no cards but just added one more
				this.initLoad();
			}
		});
	}

	async loadMore(): Promise<void> {
		const lastSnapshot = this.queueSnapshot[this.queueSnapshot.length - 1];

		if (lastSnapshot) {
			const docs: QueryDocumentSnapshot<any>[] = (await this.queuesService
				.getQueueByIdFromTo(this.activeQueue.queueType, lastSnapshot, this.limit)
				.toPromise())
				.docs;

			if (docs.length > 0) {
				this.queueSnapshot = this.queueSnapshot.concat(...docs);
				this.queue = this.queue.concat(...docs.map(item => item.data()));
			}
		}
	}

	onInfiniteScroll(event): void {
		setTimeout(() => {
			this.loadMore();

			event.target.complete();
		}, 500);
	}

	trackQueue(index, queue: IQueueItem) {
		return queue ? queue.id : undefined;
	}
}
