import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  private API_URL = 'http://localhost/backend_projet/index.php';
  constructor(private http: HttpClient) {}

  countUsers() {
    return this.http.get<any>(this.API_URL + '?controller=utilisateur&action=count');
  }

  getUsers() {
    return this.http.get<any[]>(this.API_URL + '?controller=utilisateur&action=list');
  }

  getUserById(id: number) {
    return this.http.get<any>(this.API_URL + '?controller=utilisateur&action=get&id=' + id);
  }

  addUser(u: any) {
    const f = new FormData();
    f.append('username', u.username);
    f.append('email', u.email || '');
    f.append('password', u.password);
    f.append('nom', u.nom || '');
    f.append('prenom', u.prenom || '');
    f.append('tel', u.tel || '');
    return this.http.post<any>(this.API_URL + '?controller=utilisateur&action=add', f);
  }

  updateUser(u: any) {
    const f = new FormData();
    f.append('id_u', String(u.id_u));
    f.append('username', u.username);
    f.append('email', u.email || '');
    f.append('password', u.password);
    f.append('nom', u.nom || '');
    f.append('prenom', u.prenom || '');
    f.append('tel', u.tel || '');
    return this.http.post<any>(this.API_URL + '?controller=utilisateur&action=update', f);
  }

  deleteUser(id: number) {
    return this.http.get<any>(this.API_URL + '?controller=utilisateur&action=delete&id=' + id);
  }
}
