import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHome } from './public-home/public-home';
import { PublicProfil } from './public-profil/public-profil';
import { PublicReservations } from './public-reservations/public-reservations';
import { PublicReserver } from './public-reserver/public-reserver';
import { PublicSalles } from './public-salles/public-salles';
import { PublicReclamation } from './public-reclamation/public-reclamation';
import { PublicProfilPassword } from './public-profil/public-profil-password/public-profil-password';

const routes: Routes = [
  { path: '', component: PublicHome},
  { path: 'profil', component: PublicProfil },
  { path: 'salles', component: PublicSalles },
  { path: 'reserver/add', component: PublicReserver },
  { path: 'reservations', component: PublicReservations },
  { path: 'reservations/edit/:id_r', component: PublicReserver },
  { path: 'reclamation', component: PublicReclamation },
  { path: 'profil/password', component: PublicProfilPassword}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
