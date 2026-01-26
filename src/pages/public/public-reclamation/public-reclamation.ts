import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReclamationService } from '../../../core/services/reclamation.service';

@Component({
  selector: 'app-public-reclamation',
  standalone: false,
  templateUrl: './public-reclamation.html',
  styleUrl: './public-reclamation.css',
})
export class PublicReclamation implements OnInit {
  contenu = '';
  id_u = 0;

  constructor(
    private authSvc: AuthService,
    private recSvc: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const username = localStorage.getItem('username') || '';
    this.authSvc.getSession().subscribe({
      next: (user: any) => {
              if (!user || !user.username) {
                alert("Session expirée, veuillez vous reconnecter.");
                this.router.navigate(['/']);
                return;
              }

        this.authSvc.getProfile(user.username).subscribe({
          next: (u: any) => (this.id_u = u.id_u),
          error: () => alert('Erreur serveur'),
        });
      },
      error: () => alert("Erreur session"),
    });
  }

  envoyer() {
    this.recSvc.addReclamation(this.id_u, this.contenu).subscribe({
      next: (res) => {
        if (res === 'ok') {
          alert('Réclamation envoyée avec succès!');
          this.router.navigate(['/public']);
        } else {
          alert('Erreur envoi réclamation');
        }
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
