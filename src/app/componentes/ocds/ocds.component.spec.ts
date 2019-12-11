import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcdsComponent } from './ocds.component';

describe('OcdsComponent', () => {
  let component: OcdsComponent;
  let fixture: ComponentFixture<OcdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
