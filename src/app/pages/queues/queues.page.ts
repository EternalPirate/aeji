import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

import { QueuesService, IQueuesResponse, IQueueItem } from '../../services/queues.service';

@Component({
	selector: 'app-queues',
	templateUrl: 'queues.page.html',
	styleUrls: ['queues.page.scss'],
	animations: [
		// nice stagger effect when showing existing elements
		trigger('list', [
			transition(':enter', [
				// child animation selector + stagger
				query('@items',
					stagger(300, animateChild()), { optional: true }
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
export class QueuesPage implements OnInit {
	queuesNotEmpty = false;
	queues: IQueuesResponse[];
	loaded = false;

	constructor(
		private queuesService: QueuesService,
		private router: Router
	) {
	}

	ngOnInit(): void {
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
