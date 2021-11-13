import { FoundMovieResponse } from './../models/foundMovie.model';
import { MovieService } from './../services/movie.service';
import { Movie } from './../models/movie.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  searchForm:FormGroup;

  searchKeyword:FormControl;

  foundMovie:Movie[];

  constructor(private movieService:MovieService) {
    this.searchKeyword = new FormControl('');

    this.searchForm = new FormGroup({
      searchKeyword:this.searchKeyword
    })

    this.foundMovie = [];
   }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.movieService.getMovieByKeyword(this.searchKeyword.value).subscribe(apiResponse => {
      const foundMovie: FoundMovieResponse = apiResponse;
    })
  }

  cancel() {

  }

}
