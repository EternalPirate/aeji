import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { QueuesService } from '../../services/queues.service';
import { YouTubeURLParser } from '@iktakahiro/youtube-url-parser';

@Component({
	selector: 'app-new-video',
	templateUrl: './new-video.page.html',
	styleUrls: ['./new-video.page.scss'],
})
export class NewVideoPage implements OnInit {
	newVideo = this.fb.group({
		name: [''],
		price: ['', Validators.compose([
			Validators.required,
			Validators.pattern('^[0-9]*$')
		])],
		url: ['', Validators.compose([
			Validators.minLength(5),
			Validators.required,
			// tslint:disable-next-line:max-line-length
			Validators.pattern('^(?:https?:\\/\\/)?(?:www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$')
		])],
		queueType: [1, Validators.required],
		createdAt: [''],
		message: ['']
	});

	static getQueryStringParams(url): any {
		const params = {};
		const parser = document.createElement('a');
		parser.href = url;
		const query = parser.search.substring(1);
		const vars = query.split('&');
		for (const key of vars) {
			const pair = key.split('=');
			params[pair[0]] = decodeURIComponent(pair[1]);
		}
		return params;
	}

	constructor(
		private db: QueuesService,
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private router: Router
	) {
	}

	ngOnInit() {
	}

	async onSubmit() {
		// need to convert youtube link to use it on mobile
		// to embedded
		const parser = new YouTubeURLParser(this.newVideo.value.url);
		const params = NewVideoPage.getQueryStringParams(this.newVideo.value.url);
		let url = parser.getEmbeddingURL();
		// + start time if we have it
		if (params.t) {
			url += `&start=${params.t}`;
		}

		const createdAt = (new Date()).toString();

		this.db.createQueue({
			...this.newVideo.value,
			createdAt,
			url
		});

		const loading = await this.loadingController.create({
			duration: 2000
		});
		await loading.present();

		this.router.navigate(['queues']);
	}
}
