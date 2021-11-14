import { Playlist } from './../models/playlist';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    
      // API TEST
    private userService: UserService,
    private playlistService: PlaylistService

    
    ) { }

  ngOnInit(): void {
  }


  // API TEST
  getUsers(){
    this.userService.getUsers().subscribe(data => {
      console.log(data);
    });
  }
  
  getUser(){
    this.userService.getUser(1).subscribe(data => {
      console.log(data);
    });
  }

  getPlaylists(){
    this.playlistService.getPlaylists().subscribe(data => {
      console.log(data);
    });
  }

  getPlaylist(){
    this.playlistService.getPlaylist(1).subscribe(data => {
      console.log(data);
    });
  }

  getPlaylistByUserId(){
    this.playlistService.getPlaylistByUserId(1).subscribe(data => {
      console.log(data);
    });
  }

  deletePlaylist(){
    this.playlistService.deletePlaylist(1).subscribe(data => {
      console.log(data);
    });
  }
}
