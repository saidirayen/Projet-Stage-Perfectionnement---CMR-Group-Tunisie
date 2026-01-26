import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReservations } from './public-reservations';

describe('PublicReservations', () => {
  let component: PublicReservations;
  let fixture: ComponentFixture<PublicReservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicReservations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReservations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
