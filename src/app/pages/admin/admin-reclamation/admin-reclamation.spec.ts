import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReclamation } from './admin-reclamation';

describe('AdminReclamation', () => {
  let component: AdminReclamation;
  let fixture: ComponentFixture<AdminReclamation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReclamation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReclamation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
