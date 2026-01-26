import { Component, OnInit } from '@angular/core';
import { SalleService } from '../../../core/services/salle.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-home',
  standalone: false,
  templateUrl: './public-home.html',
  styleUrl: './public-home.css',
})

export class PublicHome implements OnInit {
  nbDisponibles = 0;
  nbReservationsToday = 0;
  nbReservationsFuture = 0;
  nom = '';
  prenom = '';

  constructor(
    private authSvc: AuthService,
    private salleSvc: SalleService,
    private resSvc: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salleSvc.countSallesDisponibles().subscribe({
      next: (n) => (this.nbDisponibles = n),
    });

    // const username = localStorage.getItem('username') || '';

    // this.authSvc.getProfile(username).subscribe({
    //   next: (u: any) => {
    //     this.nom = u.nom;
    //     this.prenom = u.prenom;

    //     this.resSvc.countReservationsByUserToday(u.id_u).subscribe({
    //       next: (n) => (this.nbReservationsToday = n),
    //     });

    //     this.resSvc.countReservationsByUserFuture(u.id_u).subscribe({
    //       next: (n) => (this.nbReservationsFuture = n),
    //     });
    //   },
    //   error: () => alert('Erreur serveur)'),
    // });

    this.authSvc.getSession().subscribe({
      next: (user: any) => {
        if (!user || !user.username) {
          alert("Session expirée, veuillez vous reconnecter.");
          this.router.navigate(['/']);
          return;
        }
        this.authSvc.getProfile(user.username).subscribe({
          next: (u: any) => {
            this.nom = u.nom;
            this.prenom = u.prenom;

            this.resSvc.countReservationsByUserToday(u.id_u).subscribe({
              next: (n) => (this.nbReservationsToday = n),
            });

            this.resSvc.countReservationsByUserFuture(u.id_u).subscribe({
              next: (n) => (this.nbReservationsFuture = n),
            });
          },
          error: () => alert('Erreur serveur'),
        });
      },
      error: () => alert("Erreur session"),
    });
  }
}

