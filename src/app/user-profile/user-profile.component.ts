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
    username: "",
    name: "",
    emailAddress: "",
    pictureUrl: "",
    bio: "",
    playlists: []
  }

  constructor(private router: Router, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.getUser();
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

}
