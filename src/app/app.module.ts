import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
		AngularFirestoreModule, // imports firebase/firestore, only needed for database features
		AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
		AngularFireStorageModule // imports firebase/storage only needed for storage features
	],
	providers: [
		StatusBar,
		SplashScreen,
		AppRoutingModule,
		AngularFireDatabase,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
