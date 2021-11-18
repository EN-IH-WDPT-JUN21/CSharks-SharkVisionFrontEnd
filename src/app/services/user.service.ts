import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Playlist } from '../models/playlist.model';
import { NewPlaylist } from '../models/newPlaylist.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl: string = "http://localhost:8000/movie-app/users";

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/authenticated");
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

    // Get all Users
    getUsers() : Observable<any> {
      return this.http.get<User[]>(this.baseUrl + 'all');
    }
    
    // Get User by id
    getUser(id: number) : Observable<any> {
      return this.http.get<User>(this.baseUrl + id);
    }
  
    // Register a User
    registerUser(user: Object): Observable<Object> {
      return this.http.post(this.baseUrl, user);
    }
  
    // Update User
    setUser(id: number, value: any): Observable<Object> {
      return this.http.put(this.baseUrl + id + '/set', value);
    }
  
    // Create Playlist
    createPlaylist(id: number, newPlaylist: NewPlaylist): Observable<Object> {
      return this.http.post(this.baseUrl + id + '/createPlaylist', newPlaylist);
    }
}