import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewVideoPage } from './new-video.page';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
	{
		path: '',
		component: NewVideoPage
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [NewVideoPage]
})
export class NewVideoPageModule {
}
