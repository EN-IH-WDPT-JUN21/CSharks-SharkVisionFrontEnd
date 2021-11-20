import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from './../services/movie.service';
import { PlaylistService } from './../services/playlist.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from '../models/playlist.model';
import { MovieDetail } from '../models/movieDetail.model';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
})
export class PlaylistDetailsComponent implements OnInit {
  playlistId: number = this.activatedRoute.snapshot.params['playlistId'];
  movieDetailsList: MovieDetail[];
  foundMovie: MovieDetail;

  @Input()
  playlist!: Playlist;

  constructor(
    private playlistService: PlaylistService,
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.foundMovie = new MovieDetail('', '', '', '', '', '', '', '', '', '');
    this.movieDetailsList = [];
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.playlistService.getAllMoviesIdByPlaylistId(this.playlistId).subscribe((result: string[]) => {
      for (let i = 0; i < result.length; i++) {
        this.movieService.getMovieById(result[i]).subscribe(result => {
          this.foundMovie = result;
          this.movieDetailsList.push(this.foundMovie);
        });
      }
    });
  }

  sendBack(): void {
    this.router.navigate(['/playlists']);
  }

  removeMovie(movieId: string): void {
    this.playlistService.removeMovie(this.playlistId, movieId).subscribe(
      () => {
        this.movieDetailsList = [];
        this.getMovies();
        this.openSnackBar('Movie removed from playlist', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 4000 });
  }

}
