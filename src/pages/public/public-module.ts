import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing-module';
import { PublicHome } from './public-home/public-home';
import { PublicProfil } from './public-profil/public-profil';
import { PublicReservations } from './public-reservations/public-reservations';
import { PublicReserver } from './public-reserver/public-reserver';
import { FormsModule } from '@angular/forms';
import { PublicSalles } from './public-salles/public-salles';
import { PublicReclamation } from './public-reclamation/public-reclamation';
import { PublicProfilPassword } from './public-profil/public-profil-password/public-profil-password';

@NgModule({
  declarations: [
    PublicHome,
    PublicProfil,
    PublicProfilPassword,
    PublicReservations,
    PublicReserver,
    PublicSalles,
    PublicReclamation
    ],
  imports: [
    CommonModule,
    FormsModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
