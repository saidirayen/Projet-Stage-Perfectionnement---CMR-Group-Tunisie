import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../../../../core/services/utilisateur.service';

@Component({
  selector: 'app-admin-users-form',
  standalone: false,
  templateUrl: './admin-users-form.html',
  styleUrl: './admin-users-form.css',
})
export class AdminUsersForm implements OnInit {
  user: any = { id_u: 0, username: '', email: '', password: '', nom: '', prenom: '', tel: '' };
  isEdit = false;

  passwordPattern = "^(?=[A-Z])(?=.*[^A-Za-z0-9]).*$";
  emailPattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

  constructor(private route: ActivatedRoute, private router: Router, private userSvc: UtilisateurService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null) {
      this.isEdit = true;
      this.userSvc.getUserById(+id).subscribe({
        next: (res) => {
          if(res === 'erreur')
            alert('Utilisateur introuvable');
          else {
            this.user = res;
          }
        },
        error: () => alert('Erreur serveur'),
      });
    }
  }

  sauvegarder() {
    const req = this.isEdit ? this.userSvc.updateUser(this.user) : this.userSvc.addUser(this.user);
    req.subscribe({
      next: (res) => {
        if(res === 'ok'){
          if(this.isEdit){
            alert("Utilisateur modifié!");
          }
          else
            alert("Utilisateur ajouté!");
          this.router.navigate(['/admin/users']);
        }
        else if(res === 'existe') 
          alert('Username ou email existe déjà');
        else 
          alert('Erreur sauvegarde');
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
