import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationsForm } from './admin-reservations-form';

describe('AdminReservationsForm', () => {
  let component: AdminReservationsForm;
  let fixture: ComponentFixture<AdminReservationsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReservationsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservationsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
