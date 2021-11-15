import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  readonly searchTitle:string = "https://imdb-api.com/en/API/SearchMovie/k_xmbw7o8f/";
  readonly searchId:string = "https://imdb-api.com/en/API/Title/k_xmbw7o8f/";
  readonly popMovies:string = "https://imdb-api.com/en/API/MostPopularMovies/k_xmbw7o8f";

  constructor(
    private http:HttpClient
  ) { }

  getMovie(searchName:string) : Observable<any> {
    return this.http.get<any>(this.searchTitle + searchName);
  }

  getMovieById(id:string) : Observable<any> {
    return this.http.get<any>(this.searchId + id + "/FullActor,Posters");
  }

  getPopularMovies() : Observable<any> {
    return this.http.get<any>(this.popMovies);
  }
}
