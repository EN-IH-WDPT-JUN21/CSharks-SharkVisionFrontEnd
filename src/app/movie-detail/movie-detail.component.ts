import { MovieDetail } from './../models/movieDetail.model';
import { MovieService } from './../services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input () movieDetail!: Movie;
  foundMovie: MovieDetail;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private movieService:MovieService) {
      this.foundMovie = new MovieDetail('','','','','','','','','','');
   }

  ngOnInit(): void {
    const movieId:string = this.activatedRoute.snapshot.params['movieDetail'];

    this.movieService.getMovieById(this.movieDetail.id).subscribe(
      result => {
        this.foundMovie = result;
      }
    )
  }

  back():void {
    this.router.navigate(['/search']);
  }



}
