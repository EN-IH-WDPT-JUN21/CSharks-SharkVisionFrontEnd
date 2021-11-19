import { MovieService } from './../services/movie.service';
import { PlaylistService } from './../services/playlist.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Playlist } from '../models/playlist.model';
import { templateVisitAll } from '@angular/compiler';
import { MovieDetail } from '../models/movieDetail.model';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {
  playlistId: number = this.activatedRoute.snapshot.params['playlistId'];
  movie!: Movie;
  movieList!: Movie[];
  movieIdList!: string[];
  movieDetailsList!: MovieDetail[];
  
  @Input() 
  playlist!: Playlist;
  
  constructor(private playlistService: PlaylistService, private movieService: MovieService, private router: Router, private activatedRoute:ActivatedRoute,) {   
  };
  
  ngOnInit(): void {
    this.getMoviesId(); 
    this.getMovieDetails()
  }
  
  getMoviesId():void {
    this.playlistService.getAllMoviesIdByPlaylistId(this.playlistId).subscribe(result => {
      this.movieIdList = result;
    });
  };
  
  getMovieDetails(): void {
    let movieDetail = new MovieDetail('','','','','','','','','','');
    for(let i = 0; i < this.movieIdList.length; i++) {
      this.movieService.getMovieById(this.movieIdList[i]).subscribe(result => {
      movieDetail.image = result.image;
      movieDetail.fullTitle = result.fullTitle;
      movieDetail.plot = result.plot;
      this.movieDetailsList.push(movieDetail);
      });
    }
  }

  sendBack(): void {
    this.router.navigate(['/playlists']);
  }
}