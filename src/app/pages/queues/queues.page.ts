import { Component, OnInit } from '@angular/core';
import { QueuesService, QueuesResponse } from '../../services/queues.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-queues',
	templateUrl: 'queues.page.html',
	styleUrls: ['queues.page.scss'],
})
export class QueuesPage implements OnInit {
	queues: QueuesResponse[];

	constructor(
		private dataService: QueuesService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.dataService
			.getQueuesList()
			.subscribe((queues: QueuesResponse[]) => {
				this.queues = queues;
			});
	}

	openQueue(key: string): void {
		this.router.navigate(['queue', key]);
	}

	addNew(): void {
		this.router.navigate(['new-video']);
	}
}
