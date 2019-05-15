import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ISettingsHelp } from '../../pages/settings/settings.page';

@Component({
	selector: 'app-image',
	templateUrl: './image.page.html',
	styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
	@Input() help: ISettingsHelp;

	constructor(private modalController: ModalController) {
	}

	ngOnInit() {
	}
}
