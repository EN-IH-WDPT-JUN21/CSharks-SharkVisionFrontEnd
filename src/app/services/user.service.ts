import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
    // Update User's Picture
    setUserUrl(value: string): Observable<Object> {
      return this.http.patch(this.baseUrl + '/authenticated/set', {}, { params: { picture: value } });
      }

    // Update User's Bio
    setUserBio(value: string): Observable<Object> {
      return this.http.patch(this.baseUrl + '/authenticated/set', {}, { params: { bio: value } });
    }
  
    // Create Playlist
    createPlaylist(newPlaylist: NewPlaylist): Observable<Object> {   
      const body = {
        name: newPlaylist.name,
        visible: newPlaylist.visible
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

      return this.http.post(this.baseUrl + '/authenticated/createPlaylist', body,{'headers':headers})
    }    
}