import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfilPassword } from './public-profil-password';

describe('PublicProfilPassword', () => {
  let component: PublicProfilPassword;
  let fixture: ComponentFixture<PublicProfilPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicProfilPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicProfilPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
