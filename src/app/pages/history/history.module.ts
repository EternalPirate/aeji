import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryPage } from './history.page';
import { SharedModule } from '../../shared.module';

const routes: Routes = [
	{
		path: '',
		component: HistoryPage
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [HistoryPage]
})
export class HistoryPageModule {
}
