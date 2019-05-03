import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
		message: ['']
	});

	constructor(private fb: FormBuilder) {
	}

	ngOnInit() {
	}

}
