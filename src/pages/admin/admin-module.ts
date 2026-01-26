import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing-module';

import { AdminHome } from './admin-home/admin-home';
import { AdminProfil } from './admin-profil/admin-profil';
import { AdminSalles } from './admin-salles/admin-salles';
import { AdminSallesForm } from './admin-salles/admin-salles-form/admin-salles-form';
import { FormsModule } from '@angular/forms';
import { AdminEquip } from './admin-equip/admin-equip';
import { AdminEquipForm } from './admin-equip/admin-equip-form/admin-equip-form';
import { AdminReservations } from './admin-reservations/admin-reservations';
import { AdminReservationsForm } from './admin-reservations/admin-reservations-form/admin-reservations-form';
import { AdminUsers } from './admin-users/admin-users';
import { AdminUsersForm } from './admin-users/admin-users-form/admin-users-form';
import { AdminReclamation } from './admin-reclamation/admin-reclamation';

@NgModule({
  declarations: [
    AdminHome,
    AdminProfil,
    AdminSalles,
    AdminSallesForm,
    AdminEquip,
    AdminEquipForm,
    AdminReservations,
    AdminReservationsForm,
    AdminUsers,
    AdminUsersForm,
    AdminReclamation
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]

})
export class AdminModule {}

