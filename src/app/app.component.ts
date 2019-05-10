import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as socketIo from 'socket.io-client';
import { YouTubeURLParser } from '@iktakahiro/youtube-url-parser';

import { DonationAlertsMessage } from './models/donation-alerts.models';
import { QueuesService } from './services/queues.service';
import { getQueryStringParams } from './services/services-utils';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	appPages = [
		{
			title: 'Очереди',
			url: '/queues',
			icon: 'home'
		},
		{
			title: 'История',
			url: '/history',
			icon: 'folder-open'
		}
	];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private queuesService: QueuesService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.initWsConnection();
		});
	}

	initWsConnection() {
		const socket = socketIo('wss://socket.donationalerts.ru:443', {
			reconnection: true,
			reconnectionDelayMax: 5000,
			reconnectionDelay: 1000,
		});

		let counter = 0;

		if (socket) {
			socket.on('connect', () => {
				socket.emit('add-user', {token: 'KflrIWcoLbdpkKQbvrWG', type: 'alert_widget'});
			});

			socket.on('donation', (msg: string) => {
				const newDonation: DonationAlertsMessage = JSON.parse(msg);
				if (newDonation) {
					// TODO: remove after tests
					counter++;
					newDonation.amount = counter;
					newDonation.message = '[https://youtu.be/oFElsHvWxn0?t=6058, x1] 00000';

					const videoReg = newDonation.message.match(/(?<=\[).+?(?=\])/gm);

					if (videoReg && videoReg[0]) {
						const videoArr = videoReg[0].split(',');
						const youtubeUrl = videoArr[0];
						const queueType = videoArr[1].trim();

						// convert youtube link tu embedded link
						const parser = new YouTubeURLParser(youtubeUrl);
						const params = getQueryStringParams(youtubeUrl);
						let url = parser.getEmbeddingURL();
						// + start time if we have it
						if (params.t) {
							url += `&start=${params.t}`;
						}

						const newVideoObj = {
							message: newDonation.message,
							username: newDonation.username,
							amount: newDonation.amount,
							currency: newDonation.currency,
							date_created: newDonation.date_created,
							url,
							queueType
						};

						this.queuesService.createQueue(newVideoObj);
					}
				}
			});
		}
	}
}
