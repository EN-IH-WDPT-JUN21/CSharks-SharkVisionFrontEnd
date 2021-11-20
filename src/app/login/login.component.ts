import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegister = false;
  isLoginError = false;
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
      return;
    }
  }

  performLogin(): void {
    const formData = this.loginForm.value;
    console.log("logging with: " + formData.username + " " + formData.password);

    if (formData.username && formData.password) {
      // let isLoginSuccess = false;
      this.isLoginError = true;
      this.auth.login(formData.username, formData.password)
        .subscribe(() => {
          console.log("Login success!");
          this.router.navigate(['/user']);
          this.isLoginError = false;
        });

      if (this.isLoginError) {
        this.loginForm.setValue({ username: formData.username, password: '' });
        this.openSnackBar("Login failed", "Try again");
      }
    }
  }

  goToRegister(): void {
    this.isRegister = true;
    this.loginForm.reset();
  }

  goToLogin(isRegister: boolean): void {
    this.isRegister = isRegister;
    this.loginForm.reset();
  }

  setUsername(username: string): void {
    this.username.setValue(username);
  }

}
