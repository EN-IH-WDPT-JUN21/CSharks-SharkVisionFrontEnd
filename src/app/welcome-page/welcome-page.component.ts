import { PlayListWithMovie } from './../models/playlist-with-movie.model';
import { NewPlaylist } from './../models/newPlaylist.model';
import { Playlist } from './../models/playlist.model';
import { PlaylistService } from './../services/playlist.service';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { MovieDetail } from './../models/movieDetail.model';
import { MovieService } from './../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { PopularMovieResponse } from '../models/popularMovie.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  isLoggedIn = false;
  popularMovies: MovieDetail[];
  randomMovie: MovieDetail;
  showDetail: boolean;

  userPlaylists: Playlist[];
  showPlaylists: boolean;

  playlistVisible: boolean;

  createNewPlaylist: boolean;

  newPlaylistForm: FormGroup;
  newPlaylist: FormControl;
  visible: FormControl;

  constructor(private auth: AuthService, private movieService: MovieService, 
    private userService: UserService, private _snackBar: MatSnackBar,
    private playlistService:PlaylistService) {
    this.popularMovies = [];
    this.randomMovie = new MovieDetail('tt1375666', '', '', '', '', 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing', '', '', '', '');
    this.showDetail = false;
    this.userPlaylists = [];
    this.showPlaylists = false;
    this.playlistVisible = false;
    this.createNewPlaylist = false;

    this.newPlaylist = new FormControl('',[Validators.required]);
    this.visible = new FormControl(false);
    this.newPlaylistForm = new FormGroup({
      newPlaylist:this.newPlaylist,
      visible:this.visible
    })
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) this.isLoggedIn = true;

    this.popularMovies = [];

    this.generatePopMovies();

    this.getUserPlaylists();
  }

  randomMovieGenerator(): void {
    var index = Math.floor(Math.random() * (99 + 1));
    var movieId = this.popularMovies[index].id;

    this.movieService.getMovieById(movieId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      result => {
        this.randomMovie = result;
      }
    )
    this.showDetail = true;
  }

  back(): void {
    this.showDetail = false;
    this.showPlaylists = false;
  }

  generatePopMovies(): void {
    this.movieService.getPopularMovies().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
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

  getUserPlaylists(): void {
    this.playlistService.getPlaylistByUserId().subscribe(
      result => {
        this.userPlaylists = result;
    })
  }

  addToPlaylist(id:number) {
    this.showPlaylists = false;
    if (this.userPlaylists[id].movies.length >= 10){
      this.openSnackBar("Playlist is full","Close");
    }
    else {
      this.addMovie(id);
    }
    this.getUserPlaylists();
  }

  addMovie(id:number) {
    this.showPlaylists = false;
    this.playlistService.addMovie(this.userPlaylists[id].playlistId,this.randomMovie.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        result => {
          
        }
      );
      this.openSnackBar("Movie added to playlist","Close");
    this.getUserPlaylists();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  createPlaylist(): void{
    let newPlaylist: PlayListWithMovie = new PlayListWithMovie(this.newPlaylistForm.value.newPlaylist, this.newPlaylistForm.value.visible, this.randomMovie.id);
    console.log(newPlaylist);
    this.userService.createPlaylistWithMovie(newPlaylist).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      console.log(result);
    });
    this.openSnackBar("Playlist created","Close");
    this.createNewPlaylist = false;
    this.getUserPlaylists();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  } 
}

