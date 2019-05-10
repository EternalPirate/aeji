import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QueuesService, IQueuesResponse } from '../../services/queues.service';

@Component({
	selector: 'app-queues',
	templateUrl: 'queues.page.html',
	styleUrls: ['queues.page.scss'],
})
export class QueuesPage implements OnInit {
	queues: IQueuesResponse[];

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
			});
	}

	openQueue(queue: IQueuesResponse): void {
		this.router.navigate(['queue', queue.queueType]);
	}
}
