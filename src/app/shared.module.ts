import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SafePipe } from './pipes/safe.pipe';
import { QueueVideoComponent } from './components/queue-video/queue-video.component';

@NgModule({
	declarations: [
		QueueVideoComponent,
		SafePipe
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		InfiniteScrollModule,
	],
	exports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		InfiniteScrollModule,
		QueueVideoComponent,
		SafePipe
	]
})
export class SharedModule {
}
