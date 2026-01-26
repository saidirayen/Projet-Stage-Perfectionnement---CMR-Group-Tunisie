import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root' 
  })

export class ReservationService {
  private API_URL = 'http://localhost/backend_projet/index.php';

  constructor(private http: HttpClient) {}

  getReservationsByUser(id_u: number) {
    return this.http.get<any[]>(
      this.API_URL + '?controller=reservation&action=listByUser&id_u=' + id_u,{ withCredentials: true }
    );
  }

  getReservationById(id_r: number) {
    return this.http.get<any>(
      this.API_URL + '?controller=reservation&action=get&id=' + id_r,{ withCredentials: true }
    );
  }

  addReservation(r: any) {
    const form = new FormData();
    form.append('id_u', String(r.id_u));
    form.append('id_s', String(r.id_s));
    form.append('date_res', r.date_res);
    form.append('heure_deb', r.heure_deb);
    form.append('heure_fin', r.heure_fin);

    return this.http.post<any>(
      this.API_URL + '?controller=reservation&action=add',
      form,{ withCredentials: true }
    );
  }

  updateReservation(r: any) {
    const form = new FormData();
    form.append('id_r', String(r.id_r));
    form.append('id_s', String(r.id_s));
    form.append('date_res', r.date_res);
    form.append('heure_deb', r.heure_deb);
    form.append('heure_fin', r.heure_fin);

    return this.http.post<any>(
      this.API_URL + '?controller=reservation&action=update',
      form,{ withCredentials: true }
    );
  }

  deleteReservation(id_r: number) {
    return this.http.get<any>(
      this.API_URL + '?controller=reservation&action=delete&id=' + id_r,{ withCredentials: true }
    );
  }

  countReservations() {
    return this.http.get<any>(
      this.API_URL + '?controller=reservation&action=count',{ withCredentials: true }
    );
  }

  countReservationsByUserToday(id_u: number) {
    return this.http.get<any>(this.API_URL +'?controller=reservation&action=countByUserToday&id_u=' +id_u,{ withCredentials: true });
  }

  countReservationsByUserFuture(id_u: number) {
    return this.http.get<any>(this.API_URL +'?controller=reservation&action=countByUserFuture&id_u=' +id_u,{ withCredentials: true });
  }

  //admin

  getReservations() {
    return this.http.get<any[]>(this.API_URL + '?controller=reservation&action=getAll',{ withCredentials: true });
  }

  getReservationByAdmin(id_r: number) {
    return this.http.get<any>(this.API_URL + '?controller=reservation&action=getReservationByAdmin&id=' + id_r,{ withCredentials: true });
  }

  addReservationAdmin(r: any) {
    const f = new FormData();
    f.append('username', r.username);
    f.append('id_s', String(r.id_s));
    f.append('date_res', r.date_res);
    f.append('heure_deb', r.heure_deb);
    f.append('heure_fin', r.heure_fin);
    return this.http.post<any>(this.API_URL + '?controller=reservation&action=addAdmin', f,{ withCredentials: true });
  }

  updateReservationAdmin(r: any) {
    const f = new FormData();
    f.append('id_r', String(r.id_r));
    f.append('username', r.username);
    f.append('id_s', String(r.id_s));
    f.append('date_res', r.date_res);
    f.append('heure_deb', r.heure_deb);
    f.append('heure_fin', r.heure_fin);
    return this.http.post<any>(this.API_URL + '?controller=reservation&action=updateAdmin', f,{ withCredentials: true });
  }

  statsBySalle() {
    return this.http.get<any>(this.API_URL + '?controller=reservation&action=statsBySalle',{ withCredentials: true });
  }

  statsByMois() {
    return this.http.get<any>(this.API_URL + '?controller=reservation&action=statsByMois',{ withCredentials: true });
  }

  statsByUser() {
    return this.http.get<any>(this.API_URL + '?controller=reservation&action=statsByUser',{ withCredentials: true });
  }

  getHoursBySalleDate(id_s: number, date_res: string) {
    return this.http.get<any[]>(
      this.API_URL +
        '?controller=reservation&action=listBySalleDate&id_s=' +
        id_s +
        '&date_res=' +
        encodeURIComponent(date_res),
      { withCredentials: true }
    );
  }

}