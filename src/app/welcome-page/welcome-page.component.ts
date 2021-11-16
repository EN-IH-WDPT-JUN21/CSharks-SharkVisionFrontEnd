import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  response = "";
  isLoggedIn = false;

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) this.isLoggedIn = true;
  }

  getUser1() {
    this.http.get("http://localhost:8000/movie-app/users/1").subscribe(
      (response) => { this.response = JSON.stringify(response) }
    )
  }

  getUser2() {
    this.http.get("http://localhost:8000/movie-app/users/2").subscribe(
      (response) => { this.response = JSON.stringify(response) }
    )
  }

  getUser3() {
    this.http.get("http://localhost:8000/movie-app/users/3").subscribe(
      (response) => { this.response = JSON.stringify(response) }
    )
  }

  getAdmin() {
    this.http.get("http://localhost:8000/movie-app/users/4").subscribe(
      (response) => { this.response = JSON.stringify(response) }
    )
  }

  getAll() {
    this.http.get("http://localhost:8000/movie-app/users/all").subscribe(
      (response) => { this.response = JSON.stringify(response) }
    )
  }

}
