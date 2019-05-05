import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { convertQueueList } from './services-utils';

export interface QueuesResponse {
	key: string;
	queueLen: number;
}

export interface QueueData {
	key?: string;
	queueType: number;
	url: string;
	message: string;
	price: number;
	name: string;
	createdAt: string;
}


@Injectable({
	providedIn: 'root'
})
export class QueuesService {
	private storageKey = 'queues';
	private readonly queuesRef: AngularFireList<QueueData> = null;

	constructor(
		private db: AngularFireDatabase
	) {
		this.queuesRef = db.list(this.storageKey);
	}

	createQueue(queue: QueueData): void {
		this.db
			.list(`${this.storageKey}/${queue.queueType}`)
			.push(queue);
	}

	deleteQueueByKey(queue: QueueData): void {
		this.db
			.list(`${this.storageKey}/${queue.queueType}`)
			.remove(queue.key);
	}

	getQueuesList(): Observable<QueuesResponse[]> {
		return this.queuesRef
			.snapshotChanges()
			.pipe(
				map(changes =>
					changes
						.map(c => ({
							key: c.payload.key,
							queueLen: Object.keys(c.payload.val()).length
						}))
				)
			);
	}

	getQueuesListById(key: string): Observable<QueueData[]> {
		return convertQueueList(this.db
			.list(`${this.storageKey}/${key}`)
			.snapshotChanges());
	}
}
