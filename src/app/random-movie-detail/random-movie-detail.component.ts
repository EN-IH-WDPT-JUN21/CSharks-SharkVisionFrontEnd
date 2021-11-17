import { Component, Input, OnInit } from '@angular/core';
import { MovieDetail } from '../models/movieDetail.model';

@Component({
  selector: 'app-random-movie-detail',
  templateUrl: './random-movie-detail.component.html',
  styleUrls: ['./random-movie-detail.component.css']
})
export class RandomMovieDetailComponent implements OnInit {

  @Input() randomMovie!:MovieDetail;

  constructor() { }

  ngOnInit(): void {
  }

}
