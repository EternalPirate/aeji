import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IGoogleUserProfile } from '../pages/login/login.page';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {

	constructor(
		private storage: Storage,
		private router: Router
	) {
	}

	async canActivate() {
		const user = await this.getUser();
		if (!user) {
			this.router.navigate(['login']);
			return false;
		} else {
			return true;
		}
	}

	async getUser(): Promise<IGoogleUserProfile> {
		return await this.storage.get('user');
	}
}
