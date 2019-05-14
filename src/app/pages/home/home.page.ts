import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { Storage } from '@ionic/storage';

import { QueuesService, IQueuesResponse, IQueueItem } from '../../services/queues.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	animations: [
		// nice stagger effect when showing existing elements
		trigger('list', [
			transition(':enter', [
				// child animation selector + stagger
				query('@items',
					stagger(100, animateChild()), {optional: true}
				)
			]),
		]),
		trigger('items', [
			// cubic-bezier for a tiny bouncing feel
			transition(':enter', [
				style({opacity: 0}),
				animate('.2s linear',
					style({opacity: 1}))
			]),
			transition(':leave', [
				style({opacity: 1}),
				animate('.2s linear',
					style({opacity: 0}))
			]),
		])
	]
})
export class HomePage implements OnInit {
	queuesNotEmpty = false;
	queues: IQueuesResponse[];
	loaded = false;

	constructor(
		private queuesService: QueuesService,
		private storage: Storage,
		private router: Router
	) {
	}

	async ngOnInit(): Promise<void> {
		await this.queuesService.initDb();

		this.queuesService
			.getQueues()
			.subscribe((queues: IQueuesResponse[]) => {
				this.queues = queues;
				this.queuesNotEmpty = this.queues.some(item => item.videoQueueLen > 0);
				this.loaded = true;
			});
	}

	openQueue(queue: IQueuesResponse): void {
		this.router.navigate(['queue', queue.queueType]);
	}

	trackQueue(index, queue: IQueueItem) {
		return queue ? queue.queueType : undefined;
	}
}
