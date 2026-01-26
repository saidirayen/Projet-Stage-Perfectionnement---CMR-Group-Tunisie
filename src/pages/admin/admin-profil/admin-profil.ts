import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profil',
  standalone: false,
  templateUrl: './admin-profil.html',
  styleUrl: './admin-profil.css',
})

export class AdminProfil implements OnInit {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // const username = localStorage.getItem('username') || '';
    this.auth.getSession().subscribe({
      next: (user: any) => {
        if (!user || !user.username) {
          alert("Session expirée, veuillez vous reconnecter.");
          this.router.navigate(['/']);
          return;
        }
        this.auth.getProfile(user.username).subscribe({
          next: (res: any) => {
            if (res === 'erreur')
               alert('Utilisateur introuvable');
            else 
              this.user = res;
          },
          error: () => alert('Erreur serveur'),
        });
      },
      error: () => alert("Erreur serveur (session)"),
    });
  }
}

