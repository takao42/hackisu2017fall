import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUiComponent } from './doctor-ui.component';

describe('DoctorUiComponent', () => {
  let component: DoctorUiComponent;
  let fixture: ComponentFixture<DoctorUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
