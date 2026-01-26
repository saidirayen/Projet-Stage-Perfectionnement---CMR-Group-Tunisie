import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSallesForm } from './admin-salles-form';

describe('AdminSallesForm', () => {
  let component: AdminSallesForm;
  let fixture: ComponentFixture<AdminSallesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSallesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSallesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
