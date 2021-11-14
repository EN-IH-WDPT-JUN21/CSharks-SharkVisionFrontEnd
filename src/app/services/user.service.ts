import { Playlist } from './../models/playlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl:string = "http://localhost:8000/movie-app/users/";

  constructor(
    private http:HttpClient
  ) { }

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
  createPlaylist(id: number, playlist: Playlist): Observable<Object> {
    return this.http.post(this.baseUrl + id + '/createPlaylist', playlist);
  }
}
