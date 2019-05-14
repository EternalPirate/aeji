import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IQueueItem } from './queues.service';
import { IGoogleUserProfile } from '../pages/login/login.page';
import { AuthGuardService } from './auth-guard.service';

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
		private authGuardService: AuthGuardService,
		private angularFirestore: AngularFirestore
	) {
		this.initDb();
	}

	async initDb(): Promise<void> {
		const user: IGoogleUserProfile = await this.authGuardService.getUser();
		this.db = this.angularFirestore
			.collection('users')
			.doc(user.id);
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
