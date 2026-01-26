import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReclamation } from './public-reclamation';

describe('PublicReclamation', () => {
  let component: PublicReclamation;
  let fixture: ComponentFixture<PublicReclamation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicReclamation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReclamation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
