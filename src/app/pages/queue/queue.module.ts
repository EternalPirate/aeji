import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueuePage } from './queue.page';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
	{
		path: '',
		component: QueuePage
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [QueuePage]
})
export class QueuePageModule {
}
