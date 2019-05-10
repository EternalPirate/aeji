import { Component, ElementRef, OnInit } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

import { HistoryService, IHistoryItem } from '../../services/history.service';
import { IQueueItem } from '../../services/queues.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.page.html',
	styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
	historyLen: number;
	limit = 2;
	history: IHistoryItem[];
	historySnapshot: QueryDocumentSnapshot<IHistoryItem>[];
	private cardsHeightIsChecked = false;

	constructor(
		private historyService: HistoryService,
		private r: ElementRef,
	) {
	}

	async ngOnInit(): Promise<void> {
		const docs: QueryDocumentSnapshot<any>[] = (await this.historyService
			.getHistory(this.limit)
			.toPromise())
			.docs;

		this.historySnapshot = docs;
		this.history = docs.map(item => item.data());

		this.checkInitHeight();
	}

	checkInitHeight(): void {
		setTimeout(() => {
			const cards = this.r.nativeElement.querySelector('#cards');
			const wp = cards.closest('ion-content');

			if (cards && cards.clientHeight < wp.clientHeight) {
				// if cards height less than screen we need to load more
				this.loadMore();
				this.cardsHeightIsChecked = true;
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

			if (docs.length > 0) {
				this.historySnapshot = this.historySnapshot.concat(...docs);
				this.history = this.history.concat(...docs.map(item => item.data()));
			}
		}
	}

	async onRefresh(event): Promise<void> {
		const fromFirstSnapshot = this.historySnapshot[0];
		const toVisibleLength = this.historySnapshot.length;

		const docs: QueryDocumentSnapshot<any>[] = (await this.historyService
			.getHistoryFromTo(fromFirstSnapshot, toVisibleLength, true)
			.toPromise())
			.docs;

		if (docs.length > 0) {
			this.historySnapshot = docs;
			this.history = docs.map(item => item.data());
		}

		event.target.complete();
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
