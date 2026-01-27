import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ReclamationService } from './core/services/reclamation.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend_projet');

  nonTraiteCount = 0;

  constructor(public router: Router, private authSvc: AuthService, private recSvc: ReclamationService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => this.refresh());
  }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  isPublicRoute(): boolean {
    return this.router.url.startsWith('/public');
  }

  logout(){
    this.authSvc.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => this.router.navigate(['/'])
    });
  }

  refresh() {
     this.recSvc.countNonTraite().subscribe({
      next: (n) => this.nonTraiteCount = Number(n),
      error: () => this.nonTraiteCount = 0,
    });
  }

}
