import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  readonly baseUrl:string = "https://imdb-api.com/en/API/Search/k_xmbw7o8f";

  constructor(
    private http:HttpClient
  ) { }

  getMovie(searchName:string) : Observable<any> {
    return this.http.get<any>(this.baseUrl + searchName);
  }
}
