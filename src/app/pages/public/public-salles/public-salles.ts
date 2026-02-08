import { Component, OnInit } from '@angular/core';
// import { ReservationService } from '../../../core/services/reservation.service';
import { SalleService } from '../../../core/services/salle.service';

@Component({
  selector: 'app-public-salles',
  standalone: false,
  templateUrl: './public-salles.html',
  styleUrl: './public-salles.css',
})
export class PublicSalles implements OnInit {
  salles: any[] = [];

  constructor(private salleSvc: SalleService) {}

  ngOnInit(): void {
    this.salleSvc.getSalles().subscribe({
      next: (res) => (this.salles = res),
      error: () => alert('Erreur serveur'),
    });
  }

  imageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/salles/default.jpg';
  }

  getStatutClass(statut: string): string {
    return statut === 'active' ? 'bg-success' : 'bg-secondary';
  }

  equipList(s: any): string[] {
    return s.equipements.split(',').map((x: string) => x.trim()).filter((x: string) => x !== '');
  }
}
