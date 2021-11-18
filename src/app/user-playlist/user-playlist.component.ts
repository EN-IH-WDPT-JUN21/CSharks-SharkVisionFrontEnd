import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewPlaylist } from '../models/newPlaylist.model';
import { Playlist } from '../models/playlist.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { PlaylistService } from '../services/playlist.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-playlist',
  templateUrl: './user-playlist.component.html',
  styleUrls: ['./user-playlist.component.css']
})
export class UserPlaylistComponent implements OnInit {

  playlistList: Playlist[];
  isLoggedIn: boolean | undefined;
  playlist!: Playlist;
  newPlaylist!: NewPlaylist;
  newPlaylistName: string;
  visible: boolean = false;
  user!: User;
  
  constructor(private playlistService: PlaylistService, private auth: AuthService, private userService: UserService, private router: Router) {
    this.playlistList = [];
    this.newPlaylistName = "";
   }

  ngOnInit(): void {
    
    this.auth.loggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.playlistService.getPlaylistByUserId().subscribe(
      result => {
        this.playlistList = result;
        console.log(result);
      });
  }

  removePlaylist(playlist:Playlist):void{
    this.playlistService.deletePlaylist(playlist.playlistId);
    console.log("Playlist removed", playlist.playlistId);

    this.playlistService.getPlaylistByUserId().subscribe(
      result => {
        this.playlistList = result;
        console.log(result);
      });
    }
    
    updatePlaylistList(): void{
    this.playlistService.getPlaylistByUserId().subscribe(
      result => {
        this.playlistList = result;
        console.log(result);
      });
    }

    changeVisible(): void{
      this.visible = !this.visible;
      console.log(this.visible);
    }
    
    addPlaylist(): void{
      let newPlaylist: NewPlaylist = new NewPlaylist(this.newPlaylistName, this.visible);
      console.log(newPlaylist);
      this.userService.createPlaylist(newPlaylist).subscribe(result => {
        console.log(result);
      });
    }
}