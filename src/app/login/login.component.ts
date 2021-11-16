import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegister: boolean = false;
  isLoginError: boolean = false;
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
  }

  performLogin(): void {
    const formData = this.loginForm.value;
    console.log("logging with: " + formData.username + " " + formData.password);

    if (formData.username && formData.password) {
      this.auth.login(formData.username, formData.password)
        .subscribe(() => {
          console.log("login success");
          this.router.navigate(['/user']);
          this.loginForm.reset();
        });

      this.loginForm.setValue({ username: formData.username, password: '' });
      this.isLoginError = true;
    }
  }

  register(): void {
    console.log("register");
    this.isRegister = true;
    this.loginForm.reset();
  }

}
