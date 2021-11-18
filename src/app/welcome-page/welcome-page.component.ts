import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { MovieDetail } from './../models/movieDetail.model';
import { MovieService } from './../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { PopularMovieResponse } from '../models/popularMovie.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  isLoggedIn = false;
  popularMovies: MovieDetail[];
  randomMovie: MovieDetail;
  showDetail: boolean;

  currentUser: number;
  userPlaylists: string[];
  showPlaylists: boolean;

  constructor(private auth: AuthService, private movieService: MovieService, private userService: UserService, private _snackBar: MatSnackBar) {
    this.popularMovies = [];
    this.randomMovie = new MovieDetail('', '', '', '', '', '', '', '', '', '');
    this.showDetail = false;
    this.userPlaylists = [];
    this.currentUser = 0;
    this.showPlaylists = false;
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) this.isLoggedIn = true;

    this.popularMovies = [];

    // this.generatePopMovies();

    this.getCurrentUser();
    this.getUserPlaylists(this.currentUser);

    this.userPlaylists = ['1', '2', '3', '1', '2', '3'];
  }

  randomMovieGenerator(): void {
    var index = Math.floor(Math.random() * (99 + 1));
    this.movieService.getMovieById(this.popularMovies[index].id).subscribe(
      result => {
        this.randomMovie = result;
      }
    )
    this.showDetail = true;
  }

  addToPlayList(): void {

  }

  back(): void {
    this.showDetail = false;
    this.showPlaylists = false;
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(result => {
      this.currentUser = result;
    })
  }

  generatePopMovies(): void {
    this.movieService.getPopularMovies().subscribe(result => {
      const popMovieResponse: PopularMovieResponse = result;
      var i = 0;
      for (let movie of popMovieResponse.items) {
        const id: string = popMovieResponse.items[i].id;
        const title: string = popMovieResponse.items[i].fullTitle;
        const image: string = popMovieResponse.items[i].image;
        const imDbRating: string = popMovieResponse.items[i].imDbRating;
        let movie = new MovieDetail(id, title, '', image, '', '', '', '', '', imDbRating);
        this.popularMovies.push(movie);
        i++;
      }
    }
    )
  }

  getUserPlaylists(userId: number): void {

  }

  addToPlaylist() {
    this.showPlaylists = false;
    this.openSnackBar("Movie added to playlist","Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

