import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegister = false;
  isLoggedIn = false;
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user']);
    }
  }

  performLogin(): void {
    const formData = this.loginForm.value;
    if (formData.username && formData.password) {
      this.auth.login(formData.username, formData.password).subscribe(
        result => {
          this.openSnackBar("Login successful", "Close");
          this.router.navigate(['/user']);
        },
        error => {
          this.loginForm.setValue({ username: formData.username, password: '' });
          this.openSnackBar("Login failed. Try again", "Close");
        }
      );
    }
  }

  goToRegister(): void {
    this.isRegister = true;
    this.loginForm.reset();
  }

  goToLogin(): void {
    this.isRegister = false;
    this.loginForm.setValue({ username: this.username.value, password: '' });
  }

  setUsername(username: string): void {
    this.username.setValue(username);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 4000 });
  }

}
