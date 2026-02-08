import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { SalleService } from '../../../core/services/salle.service';

@Component({
  selector: 'app-public-reserver',
  standalone: false,
  templateUrl: './public-reserver.html',
  styleUrl: './public-reserver.css',
})
export class PublicReserver implements OnInit {
  reservation: any = {
    id_r: 0,
    id_u: 0,
    id_s: null,
    date_res: '',
    heure_deb: '',
    heure_fin: '',
  };

  salles: any[] = [];
  isEdit = false;
  reserved: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resSvc: ReservationService,
    private authSvc: AuthService,
    private salleSvc: SalleService
  ) {}

  ngOnInit(): void {
    const id_r = this.route.snapshot.paramMap.get('id_r');
    this.salleSvc.getSalles().subscribe({
      next: (salles) => (this.salles = salles),
      error: () => alert('Erreur serveur'),
    });

    if (id_r !== null) {
      this.isEdit = true;
      this.resSvc.getReservationById(+id_r).subscribe({
        next: (r) => {
          if (r === 'erreur') {
            alert('Réservation introuvable');
            this.router.navigate(['/public/reservations']);
            return;
          }
          this.reservation = { ...this.reservation, ...r };
          this.reservation.id_s = Number(this.reservation.id_s);
          this.onChange();
        },
        error: () => alert('Erreur serveur'),
      });
    }

    this.authSvc.getSession().subscribe({
      next: (user: any) => {
        if (!user || !user.username) {
          alert('Session expirée, veuillez vous reconnecter.');
          this.router.navigate(['/']);
          return;
        }

        this.authSvc.getProfile(user.username).subscribe({
          next: (u: any) => (this.reservation.id_u = u.id_u),
          error: () => alert('Erreur serveur'),
        });
      },
      error: () => alert('Erreur session'),
    });
  }

  onChange() {
    this.reserved = [];
    const id_s = Number(this.reservation.id_s);
    const date_res = this.reservation.date_res;

    this.resSvc.getHoursBySalleDate(id_s, date_res).subscribe({
      next: (res: any) => {
        this.reserved = res.map((x: any) => ({
          ...x,
          heure_deb: this.normaliserTemps(x.heure_deb),
          heure_fin: this.normaliserTemps(x.heure_fin),
        }));
      },
      error: (err) => {
        this.reserved = [];
      },
    });
  }

  private normaliserTemps(t: any): string {
    const s = t.toString().trim();
    return s.length >= 5 ? s.substring(0,5) : s;
  }

  sauvegarder() {
    const req = this.isEdit ? this.resSvc.updateReservation(this.reservation) : this.resSvc.addReservation(this.reservation);
    req.subscribe({
      next: (res) => {
        switch (res) {
          case 'ok':
            alert(this.isEdit ? 'Réservation modifiée!' : 'Réservation effectuée avec succès!');
            this.router.navigate(['/public/reservations']);
            break;

          case 'erreur_date':
            alert("Date invalide! vous ne pouvez pas réserver une date passée.");
            break;

          case 'erreur_heure':
            alert("L'heure de début doit être inférieure à l'heure de fin.");
            break;

          case 'erreur_salle':
            alert("La salle sélectionnée n'est pas disponible.");
            break;

          case 'erreur_plage':
            alert('Les réservations sont autorisées uniquement de 08:00 à 19:00.');
            break;

          case 'erreur_minutes':
            alert('Les minutes doivent être uniquement 00 ou 30 (ex: 10:00 ou 10:30).');
            break;

          case 'erreur_heure_format':
            alert("Format d'heure invalide.");
            break;

          case 'erreur_conflit':
            alert('Ce créneau est déjà réservé pour cette salle.');
            break;

          default:
            alert('Erreur sauvegarde');
            break;
        }
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
