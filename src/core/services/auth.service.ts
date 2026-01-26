import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private API_URL = 'http://localhost/backend_projet/index.php';

  constructor(private http: HttpClient){}

   getSession() {
    return this.http.get<any>(
      this.API_URL + '?controller=auth&action=session',
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.get<any>(
      this.API_URL + '?controller=auth&action=logout',
      { withCredentials: true }
    );
  }

  login(username: string,password: string) {
    const form = new FormData();
    form.append('username',username);
    form.append('password',password);
    return this.http.post<any>(this.API_URL+'?controller=auth&action=login',form,{ withCredentials: true });
  }

  inscrire(user: any) {
    const form = new FormData();
    form.append('username', user.username);
    form.append('email', user.email);
    form.append('password', user.password);
    form.append('nom', user.nom);
    form.append('prenom', user.prenom);
    form.append('tel', user.tel);
    return this.http.post<any>(this.API_URL + '?controller=auth&action=inscrire',form,{ withCredentials: true });
  }

  getProfile(username: string) {
    return this.http.get<any>(this.API_URL+'?controller=auth&action=profile&username='+username,
    { withCredentials: true });
  }

  getPassword(username: string) {
    return this.http.get<any>(
      this.API_URL + '?controller=auth&action=getPassword&username=' + username,
      { withCredentials: true }
    );
  }

  updatePassword(username: string, password: string) {
    const f = new FormData();
    f.append('username', username);
    f.append('password', password);

    return this.http.post<any>(
      this.API_URL + '?controller=auth&action=updatePassword',
      f,
      { withCredentials: true }
    );
  }

}
