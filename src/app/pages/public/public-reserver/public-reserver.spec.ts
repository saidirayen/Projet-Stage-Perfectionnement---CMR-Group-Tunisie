import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReserver } from './public-reserver';

describe('PublicReserver', () => {
  let component: PublicReserver;
  let fixture: ComponentFixture<PublicReserver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicReserver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReserver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
