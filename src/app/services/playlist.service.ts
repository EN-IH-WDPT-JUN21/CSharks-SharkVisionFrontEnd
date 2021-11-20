import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';

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

  // Get a Playlists by id
  getPlaylist(id: number) : Observable<any> {
    return this.http.get<Playlist>(this.baseUrl + id);
  }

  // Get a Playlist by User id
  getPlaylistByUserId() : Observable<any> {
    return this.http.get<Playlist[]>(this.baseUrl + 'user/authenticated');
  }

  // Get Movie Ids by a Playlist Id
  getAllMoviesIdByPlaylistId(id: number) : Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + id + '/movies');
  }

  // Delete a Playlist
  deletePlaylist(id: number) : void {
    this.http.delete<any>(this.baseUrl + id + '/delete/').subscribe(
      data => {
        console.log("deleted");
      }
      );
  }

  // Add a Movie to a Playlist
  addMovie(playlistId:number, titleId: string) : Observable<any> {
    return this.http.put(this.baseUrl + playlistId + '/add/' + titleId, {});
  }

  // Delete a Movie from a Playlist 
  removeMovie(playlistId:number, titleId: string) : Observable<Object> {
    return this.http.put(this.baseUrl + playlistId + '/remove/' + titleId, {});
  }
}