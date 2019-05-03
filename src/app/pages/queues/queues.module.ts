import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QueuesPage } from './queues.page';
import { SharedModule } from '../../shared.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: QueuesPage
			}
		])
	],
	declarations: [QueuesPage]
})
export class QueuesPageModule {
}
