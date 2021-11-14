import { MovieDetail } from './../models/movieDetail.model';
import { FoundMovieResponse } from './../models/foundMovie.model';
import { MovieService } from './../services/movie.service';
import { Movie } from './../models/movie.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  // @Input() movie!:MovieDetail;

  searchForm:FormGroup;

  searchKeyword:FormControl;

  foundMovies:Movie[];

  constructor(private movieService:MovieService) {
    this.searchKeyword = new FormControl('');

    this.searchForm = new FormGroup({
      searchKeyword:this.searchKeyword
    })

    this.foundMovies = [];
   }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.foundMovies = [];
    this.movieService.getMovie(this.searchKeyword.value).subscribe(result => {
      const foundMoviesResponse: FoundMovieResponse = result;
      var i = 0;
      for ( let movie of foundMoviesResponse.results) {
        const id:string = foundMoviesResponse.results[i].id;
        const title:string = foundMoviesResponse.results[i].title;
        const description:string = foundMoviesResponse.results[i].description;
        const image:string = foundMoviesResponse.results[i].image;
        const resultType:string = foundMoviesResponse.results[i].resultType;
        let movie = new Movie(id,resultType,image,title,description);
        this.foundMovies.push(movie);
        i++;
      }
    })
  }

  cancel() {

  }

}
