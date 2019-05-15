import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { UserService } from './services/user.service';
import { IGoogleUserProfile } from './pages/login/login.page';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	user: IGoogleUserProfile;
	appPages = [
		{
			title: 'Очереди',
			url: '/',
			icon: 'home'
		},
		{
			title: 'История',
			url: '/history',
			icon: 'folder-open'
		},
		{
			title: 'Настройки',
			url: '/settings',
			icon: 'settings'
		}
	];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private userService: UserService,
		private storage: Storage,
		private router: Router,
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.userService.user.subscribe(user => {
				this.user = user;
			});
		});
	}

	logOut(): void {
		this.userService.user.next(null);
		this.storage.remove('user');
		this.router.navigate(['/login']);
	}
}
