import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../core/services/utilisateur.service';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  users: any[] = [];
  constructor(private userSvc: UtilisateurService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger() {
    this.userSvc.getUsers().subscribe({
      next: (res) => this.users = res,
      error: () => alert('Erreur serveur'),
    });
  }

  supprimer(id: number) {
    if(confirm('Confirmer la suppression ?')) {
      this.userSvc.deleteUser(id).subscribe({
        next: (res) => res === 'ok' ? this.charger() : alert('Erreur suppression'),
        error: () => alert('Erreur serveur'),
      });
    }
  }
}
