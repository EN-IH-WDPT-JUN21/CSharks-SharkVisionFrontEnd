import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isLoggedIn = false;
  currentUserDetails = {
    id: 0,
    username: "",
    name: "",
    emailAddress: "",
    pictureUrl: "",
    bio: "",
    playlists: []
  }
  toChangePicture: boolean = false;
  toChangeBio: boolean = false;

  constructor(private router: Router, private auth: AuthService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.isLoggedIn = this.checkLoggedIn();
    console.log('user update ' + this.isLoggedIn);
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.getUser();
    }
  }

  getUser() {

    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUserDetails.username = data.username;
        this.currentUserDetails.name = data.name;
        this.currentUserDetails.emailAddress = data.emailAddress;
        this.currentUserDetails.pictureUrl = data.pictureUrl;
        this.currentUserDetails.bio = data.bio;
        this.currentUserDetails.playlists = data.playlists;
      }
    )
  }

  changePicture() {
    this.toChangePicture = true;
  }

  changeBio() {
    this.toChangeBio = true;
  }

  saveUrl(url: any) {
    this.currentUserDetails.pictureUrl = url.target.value;
  }

  updatePicture(pictureUrl: string) {
    console.log(this.currentUserDetails.username);
    this.userService.setUserUrl(pictureUrl).subscribe(
      data => {
        console.log(data);
        this.openSnackBar("Picture updated", "Close");
      }
    );
    this.toChangePicture = false;
  }

  saveBio(bio: any) {
    this.currentUserDetails.bio = bio.target.value;
  }

  updateBio(bio: string) {
    this.userService.setUserBio(bio).subscribe(data => {
      console.log(data);
      this.openSnackBar("Bio updated", "Close");
    });
    this.toChangeBio = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 4000 });
  }

  checkLoggedIn():boolean {
    return this.auth.isLoggedIn();
  }

}
