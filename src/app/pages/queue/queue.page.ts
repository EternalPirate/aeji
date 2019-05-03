import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { QueuesService, QueueData } from '../../services/queues.service';
import { HistoryService } from '../../services/history.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-queue-list',
	templateUrl: './queue.page.html',
	styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
	queueKey: string;
	queue: QueueData[];

	constructor(
		private dataService: QueuesService,
		private historyService: HistoryService,
		private sanitizer: DomSanitizer,
		private route: ActivatedRoute
	) {
	}

	ngOnInit(): void {
		this.queueKey = this.route.snapshot.params.id;
		if (this.queueKey) {
			this.dataService
				.getQueuesListByKey(this.queueKey)
				.snapshotChanges()
				.pipe(
					map(changes =>
						changes
							.filter(a => !a.payload.val().isInHistory)
							.map(c =>
							({
								key: c.payload.key,
								...c.payload.val()
							})
						)
					)
				)
				.subscribe((queue: QueueData[]) => {
					this.queue = queue;
				});
		}
	}

	onInfiniteScroll(event): void {
		// setTimeout(() => {
		// 	this.videos.push(...this.queue.videos.splice(0, this.loadStep));
		//
		// 	event.target.complete();
		//
		// 	// App logic to determine if all data is loaded
		// 	// and disable the infinite scroll
		// 	if (this.queue.videos.length <= this.loadStep) {
		// 		event.target.disabled = true;
		// 	}
		// }, 500);
	}

	removeItem(item: QueueData): void {
		item.isInHistory = true;
		this.dataService.updateQueueItem(this.queueKey, item);
	}
}
