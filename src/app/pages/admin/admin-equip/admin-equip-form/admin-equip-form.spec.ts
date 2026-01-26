import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEquipForm } from './admin-equip-form';

describe('AdminEquipForm', () => {
  let component: AdminEquipForm;
  let fixture: ComponentFixture<AdminEquipForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEquipForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEquipForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
