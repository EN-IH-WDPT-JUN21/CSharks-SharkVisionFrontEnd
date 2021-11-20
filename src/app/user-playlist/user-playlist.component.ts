import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  private ngUnsubscribe = new Subject();

  playlistList: Playlist[];
  isLoggedIn: boolean | undefined;
  playlist!: Playlist;
  newPlaylist!: NewPlaylist;
  newPlaylistName: string;
  visible: boolean = false;
  user!: User;

  constructor(
    private playlistService: PlaylistService,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.playlistList = [];
    this.newPlaylistName = '';
  }

  ngOnInit(): void {
    this.isLoggedIn = this.checkLoggedIn();
    console.log('playlist update ' + this.isLoggedIn);
    if (!this.isLoggedIn){
      this.router.navigate(['/login']);
    } else {
      this.updatePlaylistList();
    }
  }

  updatePlaylistList(): void {
    this.playlistService.getPlaylistByUserId()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => this.playlistList = result);
  }


  changeVisible(): void {
    this.visible = !this.visible;
  }

  addPlaylist(): void {
    let newPlaylist: NewPlaylist = new NewPlaylist(this.newPlaylistName, this.visible);
    this.userService.createPlaylist(newPlaylist)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => {
          this.updatePlaylistList()
          this.openSnackBar('Playlist created: ' + this.newPlaylistName, 'Close');
        }
      );
  }

  removePlaylist(playlist: Playlist): void {
    this.playlistService.deletePlaylist(playlist.playlistId);
    this.playlistService.getPlaylistByUserId().subscribe(
      result => {
        this.playlistList = result;
        this.updatePlaylistList();
        this.openSnackBar('Playlist removed: ' + playlist.name, 'Close');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 4000 });
  }

  checkLoggedIn():boolean {
    return this.auth.isLoggedIn();
  }

}
