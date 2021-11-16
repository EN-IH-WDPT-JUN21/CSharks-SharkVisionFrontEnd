import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl: string = "http://localhost:8000/movie-app/users";

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/username/current");
  }

  register(username: string, email: string, password: string) {
    const body = { "username": username, "emailAddress": email, "password": password };
    return this.http.post<any>(this.baseUrl + "/register", body);
  }


  checkUsernameExists(username: string): Observable<boolean> {
    const body = { "username": username };
    return this.http.post<any>(this.baseUrl + "/validate/username", body);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const body = { "emailAddress": email };
    return this.http.post<any>(this.baseUrl + "/validate/email", body);
  }

}
