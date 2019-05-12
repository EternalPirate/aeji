import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
// import * as html2canvas from 'html2canvas';


import { QueuesService, IQueueItem, IQueuesResponse } from '../../services/queues.service';
import { HistoryService, IHistoryItem } from '../../services/history.service';
import { IRemoveQueueItemEvent } from '../../components/queue-video/queue-video.component';

@Component({
	selector: 'app-queue-list',
	templateUrl: './queue.page.html',
	styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
	activeQueue: IQueuesResponse = {
		queueType: null,
		videoQueueLen: null
	};
	limit = 2;
	queue: IQueueItem[];
	queueSnapshot: QueryDocumentSnapshot<IQueueItem>[];
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
			const {collection, info} = this.queuesService.getQueueById(this.activeQueue.queueType, this.limit);
			const docs: QueryDocumentSnapshot<any>[] = (await collection.toPromise()).docs;

			// get snapshot and values
			// snapshot need for lazyloading and removing items
			this.queueSnapshot = docs;
			this.queue = docs.map(item => item.data());

			// check for queue change
			info.subscribe((activeQueue: IQueuesResponse) => {
				this.activeQueue = activeQueue;
			});

			this.checkInitHeight();
		}
	}

	async removeItem(e: IRemoveQueueItemEvent): Promise<void> {
		// const appQueueVideo = e.event.target.closest('app-queue-video');
		// console.log([appQueueVideo]);
		// html2canvas(appQueueVideo).then((canvas) => {
		// 	const ctx = canvas.getContext('2d');
		// 	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		// 	const pixelArr = imageData.data;
		// 	console.log(canvas);
		// 	document.body.appendChild(canvas);
		// }).catch(() => {
		// 	// avoid Angular ngZone error
		// });


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

					this.checkInitHeight();

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
			}
		});
	}

	async onRefresh(event): Promise<void> {
		const fromFirstSnapshot = this.queueSnapshot[0];

		if (fromFirstSnapshot) {
			const toVisibleLength = this.queueSnapshot.length;

			const docs: QueryDocumentSnapshot<any>[] = (await this.queuesService
				.getQueueByIdFromTo(this.activeQueue.queueType, fromFirstSnapshot, toVisibleLength, true)
				.toPromise())
				.docs;

			this.queueSnapshot = docs;
			this.queue = docs.map(item => item.data());
		}

		event.target.complete();
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
		return queue ? queue.key : undefined;
	}
}
