import { Component, OnInit } from '@angular/core';
import { SalleService } from '../../../core/services/salle.service';

@Component({
  selector: 'app-admin-salles',
  standalone: false,
  templateUrl: './admin-salles.html',
  styleUrl: './admin-salles.css',
})
export class AdminSalles implements OnInit {
  salles: any[] = [];

  constructor(private salleSvc: SalleService) {}

  ngOnInit(): void {
    this.charger();
  }

  getStatutClass(statut: string): string {
    return statut === 'active' ? 'bg-success' : 'bg-secondary';
  }

  charger() {
    this.salleSvc.getSalles().subscribe({
      next: (res) => {
        this.salles = res;
      },
      error: () => alert('Erreur serveur'),
    });
  }

   equipList(s: any): string[] {
    return s.equipements.split(',').map((x: string) => x.trim()).filter((x: string) => x !== '');
  }

  supprimer(id: number) {
    if(confirm('Confirmer la suppression ?')){
      this.salleSvc.deleteSalle(id).subscribe({
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
