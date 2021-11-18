import { MovieService } from './../services/movie.service';
import { PlaylistService } from './../services/playlist.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie.model';
import { Playlist } from '../models/playlist.model';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {
  playlistId: number = this.activatedRoute.snapshot.params['playlistId'];
  playlist!: Playlist;
  movie!: Movie;
  // movie: Movie = new Movie("id", "resultType", "image", "title", "description");
  movieList: Movie[] = [];


  constructor(private playlistService: PlaylistService, private movieService: MovieService, private router: Router, private activatedRoute:ActivatedRoute,) {   
  }
  
  ngOnInit(): void {

    this.playlistService.getPlaylist(this.playlistId).subscribe( result => {
      this.playlist = result;
      // this.movieList = this.playlist.movies;
    });

    this.movieService.getMovieById(this.movie.id).subscribe(
      result => {
        this.movie = result;
      }
    )
}

  sendBack(): void {
    this.router.navigate(['/playlists']);
  }
}