import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'queues',
		pathMatch: 'full'
	},
	{path: 'queues', loadChildren: './pages/queues/queues.module#QueuesPageModule'},
	{path: 'queue/:id', loadChildren: './pages/queue/queue.module#QueuePageModule'},
	{path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
