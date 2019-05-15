import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { UserService } from './user.service';

export interface IQueuesResponse {
	queueType: string;
	videoQueueLen: number;
}

export interface IQueueItem {
	id: string;
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
	private storageCollectionKey = 'list';
	private db: AngularFirestoreCollection<firebase.firestore.DocumentData>;

	constructor(
		private userService: UserService,
		private angularFirestore: AngularFirestore
	) {
		this.userService.user.subscribe(user => {
			if (user) {
				this.db = this.angularFirestore
					.collection('users')
					.doc(user.id)
					.collection(this.storageKey);
			}
		});
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

	getQueueListById(id: string, limit: number): Observable<firebase.firestore.QuerySnapshot> {
		return this.db
			.doc(id)
			.collection(this.storageCollectionKey, ref => ref
				.orderBy('date_created')
				.limit(limit)
			)
			.get();
	}

	getQueueByIdSub(id: string): Observable<{}> {
		return this.db
			.doc(id)
			.valueChanges();
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
