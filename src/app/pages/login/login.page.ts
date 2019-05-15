import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

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
	loading = true;

	constructor(
		private angularFireAuth: AngularFireAuth,
		private userService: UserService,
		private router: Router,
	) {
		this.userService.user.subscribe(user => {
			if (!user) {
				this.router.navigate(['/']);
			}
		});
	}

	ngOnInit(): void {
		this.loading = false;
	}

	async logIn(): Promise<void> {
		this.loading = true;
		const gLoginRes: IGoogleLoginRes = await this.doGoogleLogin();

		if (gLoginRes && gLoginRes.additionalUserInfo && gLoginRes.additionalUserInfo.profile) {
			this.userService.setUser(gLoginRes.additionalUserInfo.profile);
			await this.router.navigate(['/']);
			this.loading = false;
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
