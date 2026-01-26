import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css']
})
export class Inscription {
  user: any = {
    username: '',
    email: '',
    password: '',
    nom: '',
    prenom: '',
    tel: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(){
    this.auth.inscrire(this.user).subscribe({
      next: (res: any) => {
        switch(res){
          case 'ok':
            alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
            this.router.navigate(['/']);
            break;

          case 'vide':
            alert('Veuillez remplir tous les champs');
            break;

          case 'existe':
            alert('Username ou Email déjà utilisé');
            break;

          default:
            alert('Erreur inscription');
            break;
        }
      },
      error: () => alert('Erreur serveur')
    });
  }
}
