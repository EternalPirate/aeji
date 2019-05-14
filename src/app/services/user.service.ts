import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';

import { IUserData, IUserSettings } from '../pages/settings/settings.page';
import { IGoogleUserProfile } from '../pages/login/login.page';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private db: AngularFirestoreDocument<any>;
	user: BehaviorSubject<IGoogleUserProfile> = new BehaviorSubject(null);

	constructor(
		private angularFirestore: AngularFirestore,
		private storage: Storage
	) {
		this.user.subscribe(user => {
			if (user) {
				if (user) {
					this.db = this.angularFirestore
						.collection('users')
						.doc(user.id);
				}
			}
		});
	}

	setSettings(settings: IUserSettings): void {
		this.db.set({settings}, {merge: true});
	}

	setUser(user: IGoogleUserProfile): void {
		this.user.next(user);

		this.storage.set('user', user);

		this.angularFirestore
			.collection('users')
			.doc(user.id)
			.set({user}, {merge: true});
	}

	getUserData(): Observable<IUserData> {
		return this.db.valueChanges();
	}
}
