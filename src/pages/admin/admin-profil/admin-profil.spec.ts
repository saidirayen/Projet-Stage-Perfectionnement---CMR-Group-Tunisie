import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfil } from './admin-profil';

describe('AdminProfil', () => {
  let component: AdminProfil;
  let fixture: ComponentFixture<AdminProfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
