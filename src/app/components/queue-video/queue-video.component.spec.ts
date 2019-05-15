import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueVideoComponent } from './queue-video.component';

describe('QueueVideoComponent', () => {
  let component: QueueVideoComponent;
  let fixture: ComponentFixture<QueueVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueVideoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
