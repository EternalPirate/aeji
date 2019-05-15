import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ImagePage } from './modals/image/image.page';
import { UserService } from './services/user.service';


@NgModule({
	declarations: [
		AppComponent,
		ImagePage
	],
	entryComponents: [
		ImagePage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot({
			swipeBackEnabled: false
		}),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		BrowserAnimationsModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		AppRoutingModule,
		AngularFireDatabase,
		AngularFireAuth,
		{
			provide: APP_INITIALIZER,
			useFactory: (ds: UserService) => () => ds.initDb(),
			deps: [UserService],
			multi: true
		},
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
