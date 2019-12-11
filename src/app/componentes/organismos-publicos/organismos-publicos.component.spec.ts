import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismosPublicosComponent } from './organismos-publicos.component';

describe('OrganismosPublicosComponent', () => {
  let component: OrganismosPublicosComponent;
  let fixture: ComponentFixture<OrganismosPublicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismosPublicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismosPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
