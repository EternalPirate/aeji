import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { IGoogleUserProfile } from '../login/login.page';

export interface IUserSettings {
	donationalertsId: string;
}

export interface IUserData {
	settings: IUserSettings;
	user: IGoogleUserProfile;
}

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
	user: IGoogleUserProfile;
	settings = this.formBuilder.group({
		donationalertsId: ['', Validators.compose([
			Validators.minLength(5)
		])],
	});

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private httpClient: HttpClient
	) {
	}

	async ngOnInit() {
		this.userService
			.getUserData()
			.subscribe((userData: IUserData) => {
				if (userData && userData.settings) {
					this.settings.setValue({
						...userData.settings
					});
				}
			});

		this.user = this.userService.user.value;
	}

	submit(form): void {
		if (form.valid) {
			const settings = form.value;

			const headers = new HttpHeaders({userId: this.user.id});
			this.httpClient.post(`${environment.apiURL}/settings`, settings, { headers }).toPromise();

			this.userService.setSettings(settings);
		}

	}
}
