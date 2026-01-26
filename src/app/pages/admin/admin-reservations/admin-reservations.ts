import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-admin-reservations',
  standalone: false,
  templateUrl: './admin-reservations.html',
  styleUrl: './admin-reservations.css',
})
export class AdminReservations implements OnInit {
  reservations: any[] = [];
  constructor(private resSvc: ReservationService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger() {
    this.resSvc.getReservations().subscribe({
      next: (res) => this.reservations = res,
      error: () => alert('Erreur serveur'),
    });
  }

  supprimer(id: number) {
    if(confirm('Confirmer la suppression ?')) {
      this.resSvc.deleteReservation(id).subscribe({
        next: (res) => res === 'ok' ? this.charger() : alert('Erreur suppression'),
        error: () => alert('Erreur serveur'),
      });
    }
  }
}
