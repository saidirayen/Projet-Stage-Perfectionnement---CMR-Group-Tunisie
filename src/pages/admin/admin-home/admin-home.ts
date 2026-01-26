import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SalleService } from '../../../core/services/salle.service';
import { EquipementService } from '../../../core/services/equipement.service';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome implements OnInit, AfterViewInit, OnDestroy {
  nbSalles = 0;
  nbEquipements = 0;
  nbUsers = 0;
  nbReservations = 0;

  chartSalle: Chart | null = null;
  chartMois: Chart | null = null;
  chartUser: Chart | null = null;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private salleSvc: SalleService,
    private equipSvc: EquipementService,
    private userSvc: UtilisateurService,
    private resSvc: ReservationService
  ) {}

  ngOnInit(): void {
    this.authSvc.getSession().subscribe({
      next: (user: any) => {
        if (!user || !user.username) {
          alert("Session expirée, veuillez vous reconnecter.");
          this.router.navigate(['/']);
          return;
        }
      },
      error: () => alert('Erreur session'),
    });

    this.salleSvc.countSalles().subscribe((n: any) => (this.nbSalles = n));
    this.equipSvc.countEquipements().subscribe((n: any) => (this.nbEquipements = n));
    this.userSvc.countUsers().subscribe((n: any) => (this.nbUsers = n));
    this.resSvc.countReservations().subscribe((n: any) => (this.nbReservations = n));
  }

  ngAfterViewInit(): void {
    this.loadChartSalle();
    this.loadChartMois();
    this.loadChartUser();  
  }

  ngOnDestroy(): void {
    this.chartSalle?.destroy();
    this.chartMois?.destroy();
    this.chartUser?.destroy();
  }

  private loadChartSalle(): void {
    this.resSvc.statsBySalle().subscribe({
      next: (data: any[]) => {
        const labels = data.map(x => x.salle);
        const values = data.map(x => Number(x.total));

        this.chartSalle = new Chart('chartSalle', {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Réservations',
                data: values,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  precision: 0,
                },
              },
            },
          },
        });
      },
      error: () => alert('Erreur serveur'),
    });
  }

  private loadChartMois(): void {
    this.resSvc.statsByMois().subscribe({
      next: (data: any[]) => {
        const labels = data.map(x => x.mois);
        const values = data.map(x => Number(x.total));

        this.chartMois = new Chart('chartMois', {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: 'Réservations',
                data: values,
                tension: 0.3,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  precision: 0,
                },
              },
            },
          },
        });
      },
      error: () => alert('Erreur serveur'),
    });
  }

  private loadChartUser(): void {
    this.resSvc.statsByUser().subscribe({
      next: (data: any[]) => {
        const labels = data.map(x => x.user);
        const values = data.map(x => Number(x.total));

        this.chartUser = new Chart('chartUser', {
          type: 'doughnut',
          data: {
            labels,
            datasets: [
              {
                label: 'Réservations',
                data: values,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      },
      error: () => alert('Erreur serveur'),
    });
  }
}
