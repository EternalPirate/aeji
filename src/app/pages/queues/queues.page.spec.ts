import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuesPage } from './queues.page';

describe('QueuesPage', () => {
  let component: QueuesPage;
  let fixture: ComponentFixture<QueuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
