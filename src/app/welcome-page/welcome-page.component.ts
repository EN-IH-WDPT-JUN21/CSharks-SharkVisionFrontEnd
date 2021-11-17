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
  randomMovie:MovieDetail;
  showDetail:boolean;

  constructor(private auth: AuthService, private movieService: MovieService) {
    this.popularMovies = [];
    this.randomMovie = new MovieDetail('','','','','','','','','','');
    this.showDetail = false; 
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

  randomMovieGenerator() :void {
    var index = Math.floor(Math.random() * (99 + 1));
    this.movieService.getMovieById(this.popularMovies[index].id).subscribe(
      result => {
        this.randomMovie = result;
      }
    )
    this.showDetail = true;
  }

  addToPlayList():void {

  }

  back():void {
    this.showDetail = false;
  }


}
