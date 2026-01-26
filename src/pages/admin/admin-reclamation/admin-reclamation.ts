import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../core/services/reclamation.service';

@Component({
  selector: 'app-admin-reclamation',
  standalone: false,
  templateUrl: './admin-reclamation.html',
  styleUrl: './admin-reclamation.css',
})
export class AdminReclamation implements OnInit {
  recs: any[] = [];

  constructor(private recSvc: ReclamationService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger() {
    this.recSvc.getReclamations().subscribe({
      next: (data) => (this.recs = data),
      error: () => alert('Erreur serveur'),
    });
  }

  marquerTraite(r: any) {
    this.recSvc.marquerTraite(r.id_rec).subscribe({
      next: (res) => {
        if(res === 'ok') 
          this.charger();
        else 
          alert("Erreur traitement");
      },
      error: () => alert("Erreur serveur"),
    });
  }
}
