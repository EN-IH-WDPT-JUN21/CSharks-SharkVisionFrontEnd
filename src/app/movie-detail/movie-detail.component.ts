import { MovieDetail } from './../models/movieDetail.model';
import { MovieService } from './../services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  @Input() movieDetail!: Movie;

  foundMovie: MovieDetail;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private movieService:MovieService) {
      this.foundMovie = new MovieDetail('','','','','','','','','','');
   }

  ngOnInit(): void {
    this.movieService.getMovieById(this.movieDetail.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      result => {
        this.foundMovie = result;
      }
    )
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  } 

}
