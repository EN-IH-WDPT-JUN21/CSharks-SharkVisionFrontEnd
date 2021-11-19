import { PlaylistService } from './../services/playlist.service';
import { AuthService } from './../services/auth.service';
import { MovieDetail } from './../models/movieDetail.model';
import { FoundMovieResponse } from './../models/foundMovie.model';
import { MovieService } from './../services/movie.service';
import { Movie } from './../models/movie.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Playlist } from '../models/playlist.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  searchForm:FormGroup;

  searchKeyword:FormControl;

  foundMovies:Movie[];

  details:boolean;
  movieDetail:Movie;

  isLoggedIn: boolean;

  userPlaylists: Playlist[];
  showPlaylists: boolean;

  constructor(private movieService:MovieService,
    private authService:AuthService, private _snackBar: MatSnackBar, private playlistService:PlaylistService) {
    this.searchKeyword = new FormControl('');

    this.searchForm = new FormGroup({
      searchKeyword:this.searchKeyword
    })

    this.foundMovies = [];
    this.details = false;
    this.movieDetail = new Movie('','','','','');
    this.isLoggedIn = false;

    this.userPlaylists = [];
    this.showPlaylists = false;
   }

  ngOnInit(): void {
    this.isLoggedIn = this.checkLoggedIn();
    this.getUserPlaylists();
  }

  onSubmit() : void {
    this.foundMovies = [];
    this.movieService.getMovie(this.searchKeyword.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
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
    this.searchForm.reset();
    this.foundMovies = [];
    this.details = false;
  }

  back() {
    this.details = false;
  }

  showDetail(movie:Movie) {
    this.details = true;
    this.movieDetail = movie;
  }

  addToPlayList(id:number) {
    this.showPlaylists = false;
    if (this.userPlaylists[id].movies.length < 10){
      this.playlistService.addMovie(this.userPlaylists[id].playlistId,this.movieDetail.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        result => {
          
        }
      );
      this.openSnackBar("Movie added to playlist","Close");
    }
    else {
      this.openSnackBar("Playlist is full","Close");
    }
    this.getUserPlaylists();
  }

  getUserPlaylists(): void {
    this.playlistService.getPlaylistByUserId().subscribe(
      result => {
        this.userPlaylists = result;
    })
  }

  checkLoggedIn():boolean {
    return this.authService.isLoggedIn();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  } 

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
