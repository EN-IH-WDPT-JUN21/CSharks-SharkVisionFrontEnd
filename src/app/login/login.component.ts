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
  isLoginError = false;
  isLoggedIn = false;
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(private auth: AuthService, private router: Router) {
    this.username = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
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
      this.auth.login(formData.username, formData.password)
        .subscribe(() => {
          console.log("Login success!");
          this.router.navigate(['/user']);
          return;
        });

      this.loginForm.setValue({ username: formData.username, password: '' });
      this.isLoginError = true;
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
