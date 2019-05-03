import { NgModule } from '@angular/core';

import { SafePipe } from './pipes/safe.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
	exports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		SafePipe,
	],
	declarations: [SafePipe]
})
export class SharedModule {
}
