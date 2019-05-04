import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QueueData } from './queues.service';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private storageKey = 'history';
	private history: QueueData[] = [];

	constructor(private storage: Storage) {
		this.storage.set(this.storageKey, this.history);
	}

	setData(data: QueueData[]) {
		this.history.push(...data);
		// this.storage.set(this.storageKey, this.history);
	}

	getData() {
		return this.history;
	}
}
