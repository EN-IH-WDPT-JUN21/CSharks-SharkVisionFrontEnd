import { MovieDetail } from './../models/movieDetail.model';
import { MovieService } from './../services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movieDetail!: MovieDetail;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private movieService:MovieService) {

   }

  ngOnInit(): void {
    const movieId:string = this.activatedRoute.snapshot.params['movieId'];

    this.movieService.getMovieById(movieId).subscribe(
      result => {
        this.movieDetail = result;
      }
    )
  }

  sentToHome():void {
    this.router.navigate(['/search']);
  }

}
