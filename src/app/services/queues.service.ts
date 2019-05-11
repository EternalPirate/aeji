import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

export interface IQueuesResponse {
	queueType: string;
	videoQueueLen: number;
}

export interface IQueueItem {
	key?: string;
	message: string;
	username: string;
	amount: number;
	currency: string;
	date_created: string;
	url: string;
	queueType: string;
}

@Injectable({
	providedIn: 'root'
})
export class QueuesService {
	private storageKey = 'queues';
	private storageCollectionKey = 'videoQueue';
	private db: AngularFirestoreCollection<IQueueItem>;

	constructor(
		private angularFirestore: AngularFirestore,
	) {
		this.db = this.angularFirestore.collection(this.storageKey);
	}

	deleteQueueItem(docId: string, snapshot: QueryDocumentSnapshot<IQueueItem>): void {
		snapshot.ref.delete();

		const queueRef = this.db.doc(docId);
		const decrement = firebase.firestore.FieldValue.increment(-1);
		// decrement videoQueueLen
		queueRef.update({
			videoQueueLen: decrement
		});
	}

	getQueues(): Observable<any[]> {
		return this.db
			.valueChanges();
	}

	getQueueById(id: string, limit: number): Observable<firebase.firestore.QuerySnapshot> {
		return this.db
			.doc(id)
			.collection(this.storageCollectionKey, ref => ref
				.orderBy('date_created')
				.limit(limit)
			)
			.get();
	}

	getQueueByIdFromTo(
		id: string,
		startSnapshot: QueryDocumentSnapshot<IQueueItem>,
		limit: number,
		includeFirst?: boolean
	): Observable<firebase.firestore.QuerySnapshot> {
		if (includeFirst) {
			return this.db
				.doc(id)
				.collection(this.storageCollectionKey, ref => ref
					.orderBy('date_created')
					.startAt(startSnapshot)
					.limit(limit)
				)
				.get();
		} else {
			return this.db
				.doc(id)
				.collection(this.storageCollectionKey, ref => ref
					.orderBy('date_created')
					.startAfter(startSnapshot)
					.limit(limit)
				)
				.get();
		}
	}
}
