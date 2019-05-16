import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IQueueItem } from '../../services/queues.service';

export interface IRemoveQueueItemEvent {
	event: Event;
	index: number;
}

@Component({
	selector: 'app-queue-video',
	templateUrl: './queue-video.component.html',
	styleUrls: ['./queue-video.component.scss'],
})
export class QueueVideoComponent implements OnInit {
	@Input() queueItem: IQueueItem;
	@Input() isHistory: boolean;
	@Input() index: number;
	@Output() removeItem = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	onRemoveItem(event: Event, index: number): void {
		this.removeItem.emit({event, index});
	}
}
