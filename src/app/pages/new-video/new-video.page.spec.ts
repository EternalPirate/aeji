import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVideoPage } from './new-video.page';

describe('NewVideoPage', () => {
  let component: NewVideoPage;
  let fixture: ComponentFixture<NewVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
