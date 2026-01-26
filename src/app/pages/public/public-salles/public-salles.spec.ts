import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSalles } from './public-salles';

describe('PublicSalles', () => {
  let component: PublicSalles;
  let fixture: ComponentFixture<PublicSalles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicSalles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSalles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
