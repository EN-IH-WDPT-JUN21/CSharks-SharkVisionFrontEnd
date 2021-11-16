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
    this.movieService.getPopularMovies().subscribe(item => {
        const popMovieResponse: PopularMovieResponse = item;
        console.log(popMovieResponse.results);
        var i = 0;
        for ( let movie of popMovieResponse.results) {
          const id:string = popMovieResponse.results[i].id;
          const title:string = popMovieResponse.results[i].fullTitle;
          const image:string = popMovieResponse.results[i].image;
          const imDbRating:string = popMovieResponse.results[i].imDbRating;
          let movie = new MovieDetail(id,title,'',image,'','','','','',imDbRating);
          this.popularMovies.push(movie);
          i++;
        }}
    )
  }


}
