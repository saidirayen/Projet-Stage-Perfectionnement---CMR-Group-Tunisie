import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalleService } from '../../../../core/services/salle.service';

@Component({
  selector: 'app-admin-salles-form',
  standalone: false,
  templateUrl: './admin-salles-form.html',
  styleUrl: './admin-salles-form.css',
})
export class AdminSallesForm implements OnInit {
  salle: any = {
    id_s: 0,
    nom: '',
    capacite: 0,
    statut: 'active',
    description: '',
  };

  isEdit = false;

  constructor(private route: ActivatedRoute,private router: Router,private salleSvc: SalleService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id!==null){
      this.isEdit = true;
      this.salleSvc.getSalleById(+id).subscribe({
        next: (res) => {
          if(res === 'erreur') 
            alert('Salle introuvable');
          else {
            this.salle = res;
          }
        },
        error: () => alert('Erreur serveur'),
      });
    }
  }

  sauvegarder() {
    const req = this.isEdit ? this.salleSvc.editSalle(this.salle) : this.salleSvc.addSalle(this.salle);
    req.subscribe({
      next: (res) => {
        if(res === 'ok'){
          if(this.isEdit){
            alert("Salle modifiée!");
          }
          else
            alert("Salle ajoutée!");
          this.router.navigate(['/admin/salles']);
        }
        else 
          alert('Erreur sauvegarde');
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
