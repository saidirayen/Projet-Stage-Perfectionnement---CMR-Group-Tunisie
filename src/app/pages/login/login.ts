import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username="";
  password="";

  constructor(private auth: AuthService, private router: Router){}

  onLogin(){
  this.auth.login(this.username,this.password)
    .subscribe((res: any) => {
      switch(res){
        case 'admin':
          // localStorage.setItem('username',this.username);
          alert('Bienvenue '+this.username);
          this.router.navigate(['/admin']);
          break;

        case 'user':
          // localStorage.setItem('username', this.username);
          alert('Bienvenue '+this.username);
          this.router.navigate(['/public']);
          break;

        case 'erreur':
          alert("Identifiants incorrects");
          break;

        default:
          alert('Serveur indisponible');
          break;
      }
    });
}
}
