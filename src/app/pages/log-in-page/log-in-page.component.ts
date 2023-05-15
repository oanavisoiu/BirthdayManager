import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { LoginRequest } from '../../models/loginRequest';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  message!: string;
  userSub!: Subscription;
  usersList: User[] = [];

  constructor(public userService: UserService, public authService: AuthenticationService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      masterPassword: new FormControl(null, [CustomValidators.passwordValid, Validators.required])
      //masterPassword: new FormControl(null, null)
    });
    this.userList();
  }

  goToSignUpPage() {
    this.router.navigate(['auth/signup']);
    console.log("sign up page")
  }

  goToLandingPage() {
    this.router.navigate(['/']);
  }

  get email() {
    return this.userForm.get('email')
  }
  get masterPassword() {
    return this.userForm.get('masterPassword')
  }

  mapLoginRequest(): LoginRequest {
    const loginRequest: LoginRequest = {
      email: this.email?.value,
      masterPassword: this.masterPassword?.value
    }
    return loginRequest;
  }

  userList() {
    this.userSub = this.userService.getUsers().subscribe(users => {
      this.usersList = users.data as User[];
      console.log(this.usersList)
      if (this.usersList.length === 0 && users.status === 200) {
        this.message = 'There is no user added yet'
        this.openSnackBar(this.message)
      }
    },
      error => {
        this.handleError(error);
      }
    )
  }

  login() {
    let loginRequest = this.mapLoginRequest();
    this.userSub = this.authService.tryLogin(loginRequest).subscribe(response => {
      console.log(response);
      let message = response.message;
      let status = response.status;
      if (status === 200 || status === 201) {
        this.openSnackBar(message);
        console.log(response.data)
        this.router.navigate(['users/' + response.data + '/accounts']);
      }
      else {
        this.openSnackBar(message);
      }
    },
      error => { this.handleError(error); }
    );
  }

  onSubmit() {
    this.login();
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
  }
  private handleError(error: HttpErrorResponse): void {
    if (error.status != 200) {
      this.message = error.error.message;
      this.openSnackBar(error.error.message)
    }
  }
}