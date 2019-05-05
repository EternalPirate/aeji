import { Component, OnInit } from '@angular/core';

import { HistoryService } from '../../services/history.service';
import { QueueData } from '../../services/queues.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.page.html',
	styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
	history: QueueData[];

	constructor(private historyService: HistoryService) {
	}

	ngOnInit() {
		this.historyService
			.getHistory()
			.subscribe((queue: QueueData[]) => {
				console.log(queue);
				this.history = queue;
			});
	}

	trackQueue(index, queue: QueueData) {
		return queue ? queue.key : undefined;
	}
}
