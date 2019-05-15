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
	@Input() last: boolean;
	@Input() index: number;
	@Output() lastVideoLoad = new EventEmitter();
	@Output() removeItem = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	onLastVideoLoad(): void {
		this.lastVideoLoad.emit();
	}

	onRemoveItem(event: Event, index: number): void {
		this.removeItem.emit({event, index});
	}
}
