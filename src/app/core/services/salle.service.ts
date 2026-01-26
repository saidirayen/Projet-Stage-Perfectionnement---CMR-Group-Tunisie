import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SalleService {
  private API_URL = 'http://localhost/backend_projet/index.php';

  constructor(private http: HttpClient) {}

  countSalles() {
  return this.http.get<any>(this.API_URL + '?controller=salle&action=count');
  }

  countSallesDisponibles() {
    return this.http.get<any>(this.API_URL + '?controller=salle&action=countDisponible');
  }

  getSalles() {
    return this.http.get<any>(this.API_URL + '?controller=salle&action=list');
  }

  listSallesActives() {
    return this.http.get<any[]>(
      this.API_URL + '?controller=salle&action=listActive'
    );
  }

  getSalleById(id: number) {
    return this.http.get<any>(this.API_URL + '?controller=salle&action=get&id=' + id);
  }

  addSalle(salle: any) {
    const form = new FormData();
    form.append('nom', salle.nom);
    form.append('capacite', String(salle.capacite));
    form.append('statut', salle.statut);
    form.append('description', salle.description || '');
    return this.http.post<any>(this.API_URL + '?controller=salle&action=add',form);
  }

  editSalle(salle: any) {
    const form = new FormData();
    form.append('id_s', String(salle.id_s));
    form.append('nom', salle.nom);
    form.append('capacite', String(salle.capacite));
    form.append('statut', salle.statut);
    form.append('description', salle.description || '');
    return this.http.post<any>(this.API_URL + '?controller=salle&action=update',form);
  }

  deleteSalle(id: number) {
    return this.http.get<any>(this.API_URL + '?controller=salle&action=delete&id=' + id);
  }

  
}
