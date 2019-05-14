import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export interface IGoogleUserProfile {
	email: string;
	family_name: string;
	given_name: string;
	granted_scopes: string;
	id: string;
	locale: string;
	name: string;
	picture: string;
	verified_email: boolean;
}

export interface IGoogleLoginRes {
	additionalUserInfo: {
		isNewUser: boolean;
		profile: IGoogleUserProfile,
		providerId: string;
	};
	credential: {
		a: null;
		accessToken: string;
		idToken: string;
		providerId: string;
		signInMethod: string;
	};
	operationType: string;
	user?: object;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	constructor(
		private angularFireAuth: AngularFireAuth,
		private userService: UserService,
		private storage: Storage,
		private router: Router
	) {
	}

	ngOnInit() {
	}

	async logIn(): Promise<void> {
		const gLoginRes: IGoogleLoginRes = await this.doGoogleLogin();

		if (gLoginRes && gLoginRes.additionalUserInfo && gLoginRes.additionalUserInfo.profile) {
			await this.storage.set('user', gLoginRes.additionalUserInfo.profile);
			await this.userService.initDb();
			this.userService.setUser(gLoginRes.additionalUserInfo.profile);
			this.router.navigate(['/']);
		} else {
			throw new Error('Can\'t save user credentials.');
		}

	}

	doGoogleLogin(): Promise<any> {
		return new Promise<any>((resolve) => {
			const provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile');
			provider.addScope('email');
			this.angularFireAuth.auth
				.signInWithPopup(provider)
				.then(res => {
					resolve(res);
				});
		});
	}
}
