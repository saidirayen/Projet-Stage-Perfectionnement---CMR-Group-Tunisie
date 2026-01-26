import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersForm } from './admin-users-form';

describe('AdminUsersForm', () => {
  let component: AdminUsersForm;
  let fixture: ComponentFixture<AdminUsersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
