import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-public-profil',
  standalone: false,
  templateUrl: './public-profil.html',
  styleUrl: './public-profil.css',
})
export class PublicProfil implements OnInit {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getSession().subscribe({
      next: (user: any) => {
        if (!user || !user.username) {
          alert("Session expirée, veuillez vous reconnecter.");
          this.router.navigate(['/']);
          return;
        }

        this.auth.getProfile(user.username).subscribe({
          next: (res: any) => {
            if (res === 'erreur') alert('Utilisateur introuvable');
            else this.user = res;
          },
          error: () => alert('Erreur serveur'),
        });
      },
      error: () => alert("Erreur session"),
    });
  }
}
