import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipementService } from '../../../../core/services/equipement.service';
import { SalleService } from '../../../../core/services/salle.service';

@Component({
  selector: 'app-admin-equip-form',
  standalone: false,
  templateUrl: './admin-equip-form.html',
  styleUrl: './admin-equip-form.css',
})
export class AdminEquipForm implements OnInit {
  equip: any = { 
    id_equip: 0, 
    nom: '', 
    id_s: '' 
  };
  salles: any[] = [];
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipSvc: EquipementService,
    private salleSvc: SalleService
  ) {}

  ngOnInit(): void {
    this.salleSvc.getSalles().subscribe({
      next: (res) => this.salles = res,
      error: () => alert('Erreur serveur (chargement salles)')
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null) {
      this.isEdit = true;
      this.equipSvc.getEquipementById(+id).subscribe({
        next: (res) => {
          if(res === 'erreur') 
            alert('Équipement introuvable');
          else { 
            this.equip = res; 
          }
        },
        error: () => alert('Erreur serveur')
      });
    }
  }

  sauvegarder() {
    const req = this.isEdit ? this.equipSvc.editEquipement(this.equip) : this.equipSvc.addEquipement(this.equip);
    req.subscribe({
      next: (res) => {
        if(res === 'ok'){
          if(this.isEdit){
            alert("Équipement modifié!");
          }
          else
            alert("Équipement ajouté!");
          this.router.navigate(['/admin/equipements']);
        }
        else 
          alert('Erreur sauvegarde');
      },
      error: () => alert('Erreur serveur')
    });
  }
}
