import { Playlist } from './../models/playlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  readonly baseUrl:string = "http://localhost:8000/movie-app/playlists/";

  constructor(
    private http:HttpClient
  ) { }

  // Get all Playlists
  getPlaylists() : Observable<any> {
    return this.http.get<Playlist[]>(this.baseUrl + 'all');
  }

  // Get Playlists by id
  getPlaylist(id: number) : Observable<any> {
    return this.http.get<Playlist>(this.baseUrl + id);
  }

  // Get Playlist By User Id
  getPlaylistByUserId(userId: number) : Observable<any> {
    return this.http.get<Playlist[]>(this.baseUrl + '/user/' + userId);
  }
}
