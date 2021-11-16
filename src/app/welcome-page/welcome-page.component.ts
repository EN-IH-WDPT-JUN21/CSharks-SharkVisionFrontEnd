import { AuthService } from './../services/auth.service';
import { MovieDetail } from './../models/movieDetail.model';
import { MovieService } from './../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { PopularMovieResponse } from '../models/popularMovie.model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
isLoggedIn = false;
  popularMovies: MovieDetail[];

  constructor(private auth: AuthService, private movieService: MovieService) {
    this.popularMovies = [];
   }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) this.isLoggedIn = true;
    
    this.popularMovies = [];
    this.movieService.getPopularMovies().subscribe(result => {
        const popMovieResponse: PopularMovieResponse = result;
        var i = 0;
        for ( let movie of popMovieResponse.items) {
          const id:string = popMovieResponse.items[i].id;
          const title:string = popMovieResponse.items[i].fullTitle;
          const image:string = popMovieResponse.items[i].image;
          const imDbRating:string = popMovieResponse.items[i].imDbRating;
          let movie = new MovieDetail(id,title,'',image,'','','','','',imDbRating);
          this.popularMovies.push(movie);
          i++;
        }}
    )
  }


}
