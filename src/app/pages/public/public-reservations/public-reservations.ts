import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-reservations',
  standalone: false,
  templateUrl: './public-reservations.html',
  styleUrl: './public-reservations.css',
})
export class PublicReservations implements OnInit {
  reservations: any[] = [];
  id_u = 0;

  constructor(
    private resSvc: ReservationService,
    private authSvc: AuthService,
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
            next: (u: any) => {
              this.id_u = u.id_u;
              this.charger();
            },
            error: () => alert('Erreur serveur (profil)'),
          });
        },
        error: () => alert("Erreur session"),
      });
  }

  charger() {
    this.resSvc.getReservationsByUser(this.id_u).subscribe({
      next: (res) => (this.reservations = res),
      error: () => alert('Erreur serveur'),
    });
  }

  supprimer(id_r: number) {
    if(confirm("Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est irréversible.")){
      this.resSvc.deleteReservation(id_r).subscribe({
        next: (res) => {
          if (res === 'ok')
             this.charger();
          else
             alert('Erreur suppression');
        },
        error: () => alert('Erreur serveur'),
      });
  }
  }
}
