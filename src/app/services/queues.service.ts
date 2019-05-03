import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export interface QueuesResponse {
	key: string;
	queue: QueueData[];
}

export interface QueueData {
	key?: string;
	queueType: number;
	urlId: string;
	message: string;
	price: number;
	name: string;
	createdAt: string;
	isInHistory: boolean;
}


@Injectable({
	providedIn: 'root'
})
export class QueuesService {
	private storageKey = '/queues';
	private readonly queuesRef: AngularFireList<QueueData> = null;

	constructor(
		private db: AngularFireDatabase
	) {
		this.queuesRef = db.list(this.storageKey);

		// this.createQueue(
		// 	5,
		// 	{
		// 		queueType: 5,
		// 		createdAt: new Date().toString(),
		// 		price: 500,
		// 		isInHistory: false,
		// 		name: 'awot',
		// 		urlId: 'jo2s20ktQ-U',
		// 		message: `Keep close to Nature's heart... and break clear away, once in awhile,
		// 				and climb a mountain or spend a week in the woods. Wash your spirit clean.`
		// 	}
		// );
	}

	createQueue(queueKey: number, queue: QueueData): void {
		this.db
			.list(`${this.storageKey}/${queueKey}`)
			.push(queue);
	}

	updateQueueItem(queueKey: string, queue: QueueData): void {
		this.db
			.list(`${this.storageKey}/${queueKey}`)
			.update(queue.key, queue);
	}

	deleteQueueByKey(key: string): Promise<void> {
		return this.queuesRef.remove(key);
	}

	getQueuesList(): AngularFireList<QueueData> {
		return this.queuesRef;
	}

	getQueuesListByKey(key: string): AngularFireList<QueueData> {
		return this.db
			.list(`${this.storageKey}/${key}`);
	}
}
