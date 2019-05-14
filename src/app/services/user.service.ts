import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthGuardService } from './auth-guard.service';
import { IGoogleUserProfile } from '../pages/login/login.page';
import { Observable } from 'rxjs';

import { IUserData, IUserSettings } from '../pages/settings/settings.page';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private db: AngularFirestoreDocument<any>;

	constructor(
		private authGuardService: AuthGuardService,
		private angularFirestore: AngularFirestore
	) {
		this.initDb();
	}

	async initDb(): Promise<void> {
		const user: IGoogleUserProfile = await this.authGuardService.getUser();
		if (user) {
			this.db = this.angularFirestore.collection('users').doc(user.id);
		}
	}

	setSettings(settings: IUserSettings): void {
		this.db.set({ settings }, {merge: true});
	}

	setUser(user: IGoogleUserProfile): void {
		this.db.set({ user }, {merge: true});
	}

	getUserData(): Observable<IUserData> {
		return this.db.valueChanges();
	}
}
