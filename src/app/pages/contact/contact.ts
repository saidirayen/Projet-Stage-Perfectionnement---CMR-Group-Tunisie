import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReclamationService } from '../../core/services/reclamation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  contenu = '';

  constructor(private recSvc: ReclamationService, private router: Router) {}

  envoyer() {
    this.recSvc.addReclamationAnonyme(this.contenu).subscribe({
      next: (res) => {
        if (res === 'ok') {
          alert('Message envoyé avec succès!');
          this.router.navigate(['/']);
        } else {
          alert('Erreur envoi message');
        }
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
