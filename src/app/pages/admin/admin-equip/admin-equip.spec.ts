import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEquip } from './admin-equip';

describe('AdminEquip', () => {
  let component: AdminEquip;
  let fixture: ComponentFixture<AdminEquip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEquip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEquip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
