import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IQueueItem } from './queues.service';
import { UserService } from './user.service';

export interface IHistoryItem extends IQueueItem {
	date_removed: firebase.firestore.FieldValue;
}

@Injectable({
	providedIn: 'root'
})
export class HistoryService {
	private storageKey = 'history';
	private db: AngularFirestoreDocument<any>;

	constructor(
		private userService: UserService,
		private angularFirestore: AngularFirestore
	) {
		this.userService.user.subscribe(user => {
			if (user) {
				this.db = this.angularFirestore
					.collection('users')
					.doc(user.id);
			}
		});
	}

	pushToHistory(item: IHistoryItem) {
		this.db
			.collection(this.storageKey)
			.add(item);
	}

	getHistoryList(limit: number): Observable<firebase.firestore.QuerySnapshot> {
		return this.db
			.collection(this.storageKey, ref => ref
				.orderBy('date_removed', 'desc')
				.limit(limit)
			)
			.get();
	}

	getHistorySub(limit: number): Observable<{}[]> {
		return this.db
			.collection(this.storageKey, ref => ref
				.orderBy('date_removed', 'desc')
				.limit(limit)
			)
			.valueChanges();
	}

	getHistoryFromTo(
		startSnapshot: QueryDocumentSnapshot<IHistoryItem>,
		limit: number,
		includeFirst?: boolean
	): Observable<firebase.firestore.QuerySnapshot> {
		if (includeFirst) {
			return this.db
				.collection(this.storageKey, ref => ref
					.orderBy('date_removed', 'desc')
					.startAt(startSnapshot)
					.limit(limit)
				)
				.get();
		} else {
			return this.db
				.collection(this.storageKey, ref => ref
					.orderBy('date_removed', 'desc')
					.startAfter(startSnapshot)
					.limit(limit)
				)
				.get();
		}
	}
}
