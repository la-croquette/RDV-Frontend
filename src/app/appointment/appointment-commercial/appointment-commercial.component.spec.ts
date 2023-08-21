import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentCommercialComponent } from './appointment-commercial.component';

describe('AppointmentCommercialComponent', () => {
  let component: AppointmentCommercialComponent;
  let fixture: ComponentFixture<AppointmentCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCommercialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
