import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  private API_URL = 'http://localhost/backend_projet/index.php';
  constructor(private http: HttpClient) {}

  addReclamation(id_u: number, contenu: string) {
    const f = new FormData();
    f.append('id_u', String(id_u));
    f.append('contenu', contenu);
    return this.http.post<any>(
      this.API_URL + '?controller=reclamation&action=add',
      f,
      { withCredentials: true }
    );
  }

  getReclamations() {
    return this.http.get<any[]>(
      this.API_URL + '?controller=reclamation&action=getAll',
      { withCredentials: true }
    );
  }

  marquerTraite(id_rec: number) {
    const f = new FormData();
    f.append('id_rec', String(id_rec));
    return this.http.post<any>(
      this.API_URL + '?controller=reclamation&action=marquerTraite',
      f,
      { withCredentials: true }
    );
  }

  countNonTraite() {
    return this.http.get<number>(
      this.API_URL + '?controller=reclamation&action=countNonTraite',
      { withCredentials: true }
    );
  }
}
