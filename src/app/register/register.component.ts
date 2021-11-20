import { CustomValidator } from './../validators/custom-validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output()
  backToLogin = new EventEmitter<boolean>();

  @Output()
  setUsernameForLogin = new EventEmitter<string>();

  isValidUsername = true;
  isValidEmail = true;

  registerForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  constructor(private userService: UserService, private _snackBar: MatSnackBar) {
    this.username = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.passwordConfirmation = new FormControl('');
    this.registerForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation
    }, [CustomValidator.checkPassword]);
  }

  ngOnInit(): void {
  }

  register(): void {
    if (!this.registerForm.valid) return;

    this.checkUsernameExists()
    console.log("Valid username2? " + this.isValidUsername);
    if (!this.isValidUsername) {
      console.log('Username already exists: ' + this.username.value);
      return;
    }

    this.checkEmailExists()
    if (!this.isValidEmail) {
      console.log('Email already exists: ' + this.email.value);
      return;
    }

    this.userService.register(this.username.value, this.email.value, this.password.value).subscribe(
      (response) => {
        console.log(response);
        this.setUsernameForLogin.emit(response.username);
        this.backToLogin.emit(false);
      });
    // this.isValidUsername = true;
    // this.isValidEmail = true;
  }

  back(): void {
    this.backToLogin.emit(false);
  }

  checkUsernameExists(){
    this.userService.checkUsernameExists(this.username.value).subscribe(
      (result: boolean) => {
        this.isValidUsername = !result
        console.log("Valid username? " + this.isValidUsername);
        console.log("Exists? " + result);
      }
    );
  }


  checkEmailExists(){
    this.userService.checkEmailExists(this.email.value).subscribe(
      (result: boolean) => {
        this.isValidEmail = !result
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
