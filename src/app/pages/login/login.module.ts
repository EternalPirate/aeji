import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { SharedModule } from '../../shared.module';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: LoginPage
			}
		])
	],
	declarations: [LoginPage]
})
export class LoginPageModule {
}
