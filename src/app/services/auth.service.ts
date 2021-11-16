import { shareReplay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const authBody = `username=${username}&password=${password}`;
    console.log(authBody);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<Object>(this.baseUrl + '/login', authBody, options).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    )
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expires_at, 'millisecond');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("expires_at"));
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("access_token"));
  }

  public isLoggedIn(): boolean {
    console.log(localStorage.getItem("access_token"));
    console.log(localStorage.getItem("expires_at"));
    if (localStorage.getItem("access_token") == null ||
      localStorage.getItem("expires_at") == null)
      return false;

    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || "0");
    return moment(expiresAt);
  }


}
