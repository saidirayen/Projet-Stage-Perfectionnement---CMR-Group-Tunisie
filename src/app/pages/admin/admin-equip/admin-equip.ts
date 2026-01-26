import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../core/services/equipement.service';

@Component({
  selector: 'app-admin-equip',
  standalone: false,
  templateUrl: './admin-equip.html',
  styleUrl: './admin-equip.css',
})
export class AdminEquip implements OnInit {
  equipements: any[] = [];

  constructor(private equipSvc: EquipementService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger() {
    this.equipSvc.getEquipements().subscribe({
      next: (res) => { 
        this.equipements = res; 
      },
      error: () => alert('Erreur serveur')
    });
  }

  supprimer(id: number) {
    if(confirm('Confirmer la suppression ?')) {
      this.equipSvc.deleteEquipement(id).subscribe({
        next: (res) => {
          if(res === 'ok')
             this.charger();
          else
             alert('Erreur suppression');
        },
        error: () => alert('Erreur serveur')
      });
    }
  }
}
