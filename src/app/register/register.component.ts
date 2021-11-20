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
  backToLogin = new EventEmitter<any>();

  @Output()
  setUsernameForLogin = new EventEmitter<string>();

  registerForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
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
  }

  back(): void {
    this.backToLogin.emit();
  }


  checkUsernameExists() {
    this.userService.checkUsernameExists(this.username.value).subscribe(
      (result: boolean) => {
        console.log(result);
        if (!result) {
          this.checkEmailExists();
        } else {
          this.openSnackBar('Username already exists: ' + this.username.value, 'Close')
        }
      },
      (error) => {
        this.openSnackBar('Error checking username', 'Close')
      }
    );
  }

  checkEmailExists() {
    this.userService.checkEmailExists(this.email.value).subscribe(
      (result: boolean) => {
        if (!result) {
          console.log(result);
          this.registerNewUser();
        } else {
          this.openSnackBar('Email already exists: ' + this.email.value, 'Close')
        }
      },
      (error) => {
        this.openSnackBar('Error checking email', 'Close')
      }
    );
  }

  registerNewUser(): void {
    this.userService.register(this.username.value, this.email.value, this.password.value).subscribe(
      (response) => {
        this.setUsernameForLogin.emit(response.username);
        this.backToLogin.emit();
      },
      (error) => {
        this.openSnackBar('Error registering user', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

}
