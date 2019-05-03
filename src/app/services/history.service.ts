import { Injectable } from '@angular/core';
import { QueueVideos } from './queues.service';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private storageKey = 'history';
	private history: QueueVideos[] = [];

	constructor(private storage: Storage) {
		this.storage.set(this.storageKey, this.history);
	}

	setData(data: QueueVideos[]) {
		this.history.push(...data);
		// this.storage.set(this.storageKey, this.history);
	}

	getData() {
		return this.history;
	}
}
