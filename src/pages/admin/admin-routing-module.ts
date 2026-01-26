import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHome } from './admin-home/admin-home';
import { AdminProfil } from './admin-profil/admin-profil';
import { AdminSalles } from './admin-salles/admin-salles';
import { AdminSallesForm } from './admin-salles/admin-salles-form/admin-salles-form';
import { AdminEquipForm } from './admin-equip/admin-equip-form/admin-equip-form';
import { AdminEquip } from './admin-equip/admin-equip';
import { AdminUsers } from './admin-users/admin-users';
import { AdminUsersForm } from './admin-users/admin-users-form/admin-users-form';
import { AdminReservations } from './admin-reservations/admin-reservations';
import { AdminReservationsForm } from './admin-reservations/admin-reservations-form/admin-reservations-form';
import { AdminReclamation } from './admin-reclamation/admin-reclamation';

const routes: Routes = [
  { path: '', component: AdminHome },
  { path: 'profil', component: AdminProfil },

  { path: 'salles', component: AdminSalles },
  { path: 'salles/add', component: AdminSallesForm },
  { path: 'salles/edit/:id', component: AdminSallesForm },

  { path: 'equipements', component: AdminEquip },
  { path: 'equipements/add', component: AdminEquipForm },
  { path: 'equipements/edit/:id', component: AdminEquipForm },

  { path: 'users', component: AdminUsers },
  { path: 'users/add', component: AdminUsersForm },
  { path: 'users/edit/:id', component: AdminUsersForm },

  { path: 'reservations', component: AdminReservations },
  { path: 'reservations/add', component: AdminReservationsForm },
  { path: 'reservations/edit/:id', component: AdminReservationsForm },

  { path: 'reclamations', component: AdminReclamation },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
