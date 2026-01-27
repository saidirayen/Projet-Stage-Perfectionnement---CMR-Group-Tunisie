import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-public-profil-password',
  standalone: false,
  templateUrl: './public-profil-password.html',
  styleUrl: './public-profil-password.css',
})
export class PublicProfilPassword implements OnInit {
  username = '';
  password = '';
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  showOld = false;
  showNew = false;
  showConfirm = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getSession().subscribe({
      next: (user: any) => {
        if (!user || !user.username) {
          alert('Session expirée, veuillez vous reconnecter.');
          this.router.navigate(['/']);
          return;
        }
        this.username = user.username;
        this.auth.getPassword(this.username).subscribe({
          next: (res: any) => {
            if (res === 'erreur') {
              alert('Utilisateur introuvable');
              this.router.navigate(['/public/profil']);
              return;
            }
            this.password = (res.password).toString();
          },
          error: () => alert('Erreur serveur'),
        });
      },
      error: () => alert('Erreur session'),
    });
  }

  modifier() {
    if (this.oldPassword !== this.password) {
      alert("Ancien mot de passe incorrect.");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas!");
      return;
    }

    this.auth.updatePassword(this.username,this.newPassword).subscribe({
      next: (res: any) => {
        if (res === 'ok') {
          alert('Mot de passe modifié avec succès!');
          this.router.navigate(['/public/profil']);
        } else {
          alert('Erreur modification');
        }
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
