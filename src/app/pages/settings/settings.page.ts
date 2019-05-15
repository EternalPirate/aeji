import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';

import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { IGoogleUserProfile } from '../login/login.page';
import { ImagePage } from '../../modals/image/image.page';

export interface IUserSettings {
	donationalertsId: string;
}

export interface IUserData {
	settings: IUserSettings;
	user: IGoogleUserProfile;
}

export interface ISettingsHelp {
	image: string;
	title: string;
}

export enum SettingsHelp {
	donationalerts,
}

@Component({
	selector: 'app-settings',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
	SettingsHelp = SettingsHelp;
	user: IGoogleUserProfile;
	help: ISettingsHelp[] = [
		{
			image: './assets/help/donationalerts.png',
			title: 'Where I can find donationalerts id?'
		}
	];
	settings = this.formBuilder.group({
		donationalertsId: ['', Validators.compose([
			Validators.minLength(5)
		])],
	});

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private httpClient: HttpClient,
		private toastController: ToastController,
		private modalController: ModalController
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

			this.httpClient.post(`${environment.apiURL}/settings`, {
				userId: this.user.id,
				settings
			}).toPromise();

			this.userService.setSettings(settings);

			this.showToastOnSubmit();
		}
	}

	async test(helpId: SettingsHelp) {
		const modal = await this.modalController.create({
			component: ImagePage,
			componentProps: {
				help: this.help[helpId]
			}
		});
		return await modal.present();
	}

	async showToastOnSubmit() {
		const toast = await this.toastController.create({
			message: 'Settings saved',
			position: 'bottom',
			duration: 2000,
			showCloseButton: true
		});
		toast.present();
	}
}
