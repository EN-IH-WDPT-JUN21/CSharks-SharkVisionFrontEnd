import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loggedIn
      .subscribe(
        loggedIn => this.isLoggedIn = loggedIn
      );
  }

  logout() {
    this.auth.logout();
  }

}
