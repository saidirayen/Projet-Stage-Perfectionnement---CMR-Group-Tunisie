import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../../core/services/reservation.service';
import { SalleService } from '../../../../core/services/salle.service';
import { UtilisateurService } from '../../../../core/services/utilisateur.service';

@Component({
  selector: 'app-admin-reservations-form',
  standalone: false,
  templateUrl: './admin-reservations-form.html',
  styleUrl: './admin-reservations-form.css',
})
export class AdminReservationsForm implements OnInit {
  reservation: any = {
    id_r: 0,
    username: '',
    id_s: null,
    date_res: '',
    heure_deb: '',
    heure_fin: '',
  };

  salles: any[] = [];
  users: any[] = [];
  reserved: any[] = [];
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resSvc: ReservationService,
    private salleSvc: SalleService,
    private userSvc: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.salleSvc.getSalles().subscribe({
      next: (res) => (this.salles = res),
      error: () => alert('Erreur serveur (chargement salles)'),
    });

    this.userSvc.getUsers().subscribe({
      next: (res) => (this.users = res),
      error: () => alert('Erreur serveur (chargement users)'),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.isEdit = true;
      this.resSvc.getReservationByAdmin(+id).subscribe({
        next: (res: any) => {
          if (res === 'erreur') {
            alert('Réservation introuvable');
            this.router.navigate(['/admin/reservations']);
            return;
          }

          this.reservation = { ...this.reservation, ...res };
          this.reservation.id_s = this.reservation.id_s !== null ? Number(this.reservation.id_s) : null;
          this.onChange();
        },
        error: () => alert('Erreur serveur'),
      });
    }
  }

  onChange() {
    this.reserved = [];
    const id_s = Number(this.reservation.id_s);
    const date_res = this.reservation.date_res;

    this.resSvc.getHoursBySalleDate(id_s,date_res).subscribe({
      next: (res: any) => {
        this.reserved = (res || []).map((x: any) => ({
          ...x,
          heure_deb: this.normaliserTemps(x.heure_deb),
          heure_fin: this.normaliserTemps(x.heure_fin),
        }));
      },
      error: () => {
        this.reserved = [];
      },
    });
  }

  private normaliserTemps(t: any): string {
    const s = t?.toString?.().trim?.() ?? '';
    return s.length >= 5 ? s.substring(0, 5) : s;
  }

  sauvegarder() {
    const req = this.isEdit ? this.resSvc.updateReservationAdmin(this.reservation) : this.resSvc.addReservationAdmin(this.reservation);
    req.subscribe({
      next: (res: any) => {
        switch (res) {
          case 'ok':
            alert(this.isEdit ? 'Réservation modifiée!' : 'Réservation ajoutée!');
            this.router.navigate(['/admin/reservations']);
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
