import { Injectable } from '@angular/core';
import { QueueData } from './queues.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { convertQueueList } from './services-utils';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private storageKey = 'history';
	private readonly historyRef: AngularFireList<QueueData> = null;
	// private history: QueueData[] = [];

	constructor(
		private db: AngularFireDatabase
	) {
		this.historyRef = db.list(this.storageKey);
		// this.storage.set(this.storageKey, this.history);
	}

	pushToHistory(queue: QueueData) {
		this.historyRef.push(queue);
	}

	getHistory(): Observable<QueueData[]> {
		return convertQueueList(this.historyRef
			.snapshotChanges());
	}
}
