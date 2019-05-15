import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
	{path: '', canActivate: [AuthGuardService], pathMatch: 'full', loadChildren: './pages/home/home.module#HomePageModule'},
	{path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
	{path: 'queue/:id', canActivate: [AuthGuardService], loadChildren: './pages/queue/queue.module#QueuePageModule'},
	{path: 'history', canActivate: [AuthGuardService], loadChildren: './pages/history/history.module#HistoryPageModule'},
	{path: 'settings', canActivate: [AuthGuardService], loadChildren: './pages/settings/settings.module#SettingsPageModule'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
