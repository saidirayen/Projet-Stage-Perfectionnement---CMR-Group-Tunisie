import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EquipementService {
  private API_URL = 'http://localhost/backend_projet/index.php';

  constructor(private http: HttpClient) {}

  countEquipements() {
    return this.http.get<any>(this.API_URL + '?controller=equipement&action=count');
  }

  getEquipements() {
    return this.http.get<any>(this.API_URL + '?controller=equipement&action=list');
  }

  getEquipementById(id: number) {
    return this.http.get<any>(this.API_URL + '?controller=equipement&action=get&id=' + id);
  }

  addEquipement(e: any) {
    const form = new FormData();
    form.append('nom', e.nom);
    form.append('desc_equip', e.desc_equip || '');
    form.append('id_s', e.id_s ? String(e.id_s) : '');
    return this.http.post<any>(this.API_URL + '?controller=equipement&action=add', form);
  }

  editEquipement(e: any) {
    const form = new FormData();
    form.append('id_equip', String(e.id_equip));
    form.append('nom', e.nom);
    form.append('desc_equip', e.desc_equip || '');
    form.append('id_s', e.id_s ? String(e.id_s) : '');
    return this.http.post<any>(this.API_URL + '?controller=equipement&action=update', form);
  }

  deleteEquipement(id: number) {
    return this.http.get<any>(this.API_URL + '?controller=equipement&action=delete&id=' + id);
  }
}
