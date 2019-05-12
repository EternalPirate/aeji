import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabase } from '@angular/fire/database';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		BrowserAnimationsModule,
		MatRippleModule,
		MatButtonModule
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
