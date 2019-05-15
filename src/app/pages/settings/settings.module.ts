import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { SharedModule } from '../../shared.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: SettingsPage
			}
		])
	],
	declarations: [SettingsPage]
})
export class SettingsPageModule {
}
