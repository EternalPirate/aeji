import { Component, ElementRef, OnInit } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { HistoryService, IHistoryItem } from '../../services/history.service';
import { IQueueItem } from '../../services/queues.service';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-history',
	templateUrl: './history.page.html',
	styleUrls: ['./history.page.scss'],
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
				style({ transform: 'scale(0.5)', opacity: 0 }),
				animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
					style({ transform: 'scale(1)', opacity: 1 }))
			]),
			transition(':leave', [
				style({ transform: 'scale(1)', opacity: 1, height: '*' }),
				animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
					style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
			]),
		])
	]
})
export class HistoryPage implements OnInit {
	historyLen: number;
	limit = 2;
	history: IHistoryItem[];
	historySnapshot: QueryDocumentSnapshot<IHistoryItem>[];

	constructor(
		private historyService: HistoryService,
		private r: ElementRef,
	) {
	}

	ngOnInit(): void {
		this.initLoad();

		this.historyService
			.getHistorySub(this.limit)
			.subscribe((e: IHistoryItem[]) => {
				this.checkInitHeight();
			});
	}

	async initLoad(): Promise<void> {
		const docs: QueryDocumentSnapshot<any>[] = (await this.historyService
			.getHistoryList(this.limit)
			.toPromise())
			.docs;

		this.historySnapshot = docs;
		this.history = docs.map(item => item.data());
	}

	checkInitHeight(): void {
		setTimeout(() => {
			const cards = this.r.nativeElement.querySelector('#cards');

			if (cards) {
				const wp = cards.closest('ion-content');

				if (cards && cards.clientHeight < wp.clientHeight) {
					// if cards height less than screen we need to load more
					this.loadMore();
				}
			} else {
				// in case if we have no cards but just added one more
				this.initLoad();
			}
		});
	}

	async loadMore(): Promise<void> {
		const lastSnapshot = this.historySnapshot[this.historySnapshot.length - 1];

		if (lastSnapshot) {
			const docs: QueryDocumentSnapshot<any>[] = (await this.historyService
				.getHistoryFromTo(lastSnapshot, this.limit)
				.toPromise())
				.docs;

			this.historySnapshot = docs ? this.historySnapshot.concat(...docs) : null;
			this.history = docs ? this.history.concat(...docs.map(item => item.data())) : null;
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
