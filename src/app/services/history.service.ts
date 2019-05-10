import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IQueueItem } from './queues.service';

export interface IHistoryItem extends IQueueItem {
	date_removed: firebase.firestore.FieldValue;
}

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private storageKey = 'history';
	private db: AngularFirestoreCollection<IHistoryItem>;

	constructor(
		private angularFirestore: AngularFirestore
	) {
		this.db = this.angularFirestore.collection(this.storageKey);
	}

	pushToHistory(item: IHistoryItem) {
		this.db.add(item);
	}

	getHistory(limit: number): Observable<firebase.firestore.QuerySnapshot> {
		return this.angularFirestore
			.collection(this.storageKey, ref => ref
				.orderBy('date_removed', 'desc')
				.limit(limit)
			)
			.get();
	}

	getHistoryFromTo(
		startSnapshot: QueryDocumentSnapshot<IHistoryItem>,
		limit: number,
		includeFirst?: boolean
	): Observable<firebase.firestore.QuerySnapshot> {
		if (includeFirst) {
			return this.angularFirestore
				.collection(this.storageKey, ref => ref
					.orderBy('date_removed', 'desc')
					.startAt(startSnapshot)
					.limit(limit)
				)
				.get();
		} else {
			return this.angularFirestore
				.collection(this.storageKey, ref => ref
					.orderBy('date_removed', 'desc')
					.startAfter(startSnapshot)
					.limit(limit)
				)
				.get();
		}
	}
}
