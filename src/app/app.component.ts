import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
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
			title: 'Queues',
			url: '/',
			icon: 'home'
		},
		{
			title: 'History',
			url: '/history',
			icon: 'folder-open'
		},
		{
			title: 'Settings',
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
		private menuController: MenuController
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.userService.user.subscribe(user => {
				console.log(user);
				this.user = user;
				this.menuController.enable(Boolean(user), 'menu');
			});
		});
	}

	logOut(): void {
		this.userService.user.next(null);
		this.storage.remove('user');
		this.router.navigate(['/login']);
	}
}
