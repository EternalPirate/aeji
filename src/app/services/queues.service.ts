import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface QueuesResponse {
	key: string;
	queueLen: number;
}

export interface QueueData {
	key?: string;
	queueType: number;
	urlId: string;
	message: string;
	price: number;
	name: string;
	createdAt: string;
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

		// this.createQueue({
		// 	queueType: 2,
		// 	createdAt: new Date().toString(),
		// 	price: 500,
		// 	name: 'awot',
		// 	urlId: 'jo2s20ktQ-U',
		// 	message: `Keep close to Nature's heart... and break clear away, once in awhile,
		// 			and climb a mountain or spend a week in the woods. Wash your spirit clean.`
		// });
	}

	createQueue( queue: QueueData): void {
		this.db
			.list(`${this.storageKey}/${queue.queueType}`)
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

	getQueuesList(): Observable<QueuesResponse[]> {
		return this.queuesRef
			.snapshotChanges()
			.pipe(
				map(changes =>
					changes.map(c =>
						({
							key: c.payload.key,
							queueLen: Object.keys(c.payload.val()).length
						})
					)
				)
			);
	}

	getQueuesListById(key: string): Observable<QueueData[]> {
		return this.db
			.list(`${this.storageKey}/${key}`)
			.snapshotChanges()
			.pipe(
				map(changes =>
					changes.map(c =>
						({
							key: c.payload.key,
							...c.payload.val()
						}) as QueueData
					)
				)
			);
	}
}
