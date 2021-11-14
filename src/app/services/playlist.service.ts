import { Playlist } from './../models/playlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  // Get a Playlist by User id
  getPlaylistByUserId(userId: number) : Observable<any> {
    return this.http.get<Playlist[]>(this.baseUrl + '/user/' + userId);
  }

  // Delete a Playlist
  deletePlaylist(id: number) : Observable<any> {
    return this.http.delete(this.baseUrl + id + '/delete');
  }

  // Add a Movie to a Playlist
  addMovie(playlistId:number, titleId: number) : Observable<any> {
    return this.http.put(this.baseUrl + playlistId + '/add/' + titleId, {});
  }

  // Delete a Movie from a Playlist 
  removeMovie(playlistId:number, titleId: number) : Observable<any> {
    return this.http.put(this.baseUrl + playlistId + '/remove/' + titleId, {});
  }
}
