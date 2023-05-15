import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../validators/custom-validators';
import { passwordMatch } from '../../validators/password-custom-validator';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  userSub!: Subscription;
  matcher = new MyErrorStateMatcher();
  usersList: User[] = [];
  message!: string;

  constructor(public userService: UserService, private _snackBar: MatSnackBar, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [CustomValidators.nameValid, Validators.required]),
      email: new FormControl(null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]),
      masterPassword: new FormControl(null, [CustomValidators.passwordValid, Validators.required]),
      masterPasswordConfirm: new FormControl(null, [Validators.required]),
    }, passwordMatch('masterPassword', 'masterPasswordConfirm'));

    this.userList();

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

  get name() {
    return this.userForm.get('name')
  }

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }

  masterPasswordConfirm(name: string) {
    return this.userForm.get('masterPasswordConfirm')
  }

  private mapUserForm(): User {
    const user: User = {
      id: '',
      name: this.name?.value,
      email: this.email?.value,
     password: this.password?.value,
      role: 'USER'
    }
    return user;
  }

  onAddUser() {
    if (this.userForm.valid) {
      let user = this.mapUserForm();
      console.log(user)
      this.userSub = this.authService.addUser(user).subscribe(users => {
        let message = users.message;
        let status = users.status;
        if (status === 200 || status === 201) {
          this.router.navigate(['/auth/login']);
        } else {
          this.openSnackBar(message)
        }
      },
        error => {
          this.handleError(error);
        }
      );
    }
    else {
      this.openSnackBar('User details are not valid.')
    }
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close',
      {
        duration: 3500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status != 200) {
      this.message = error.error.message;
      this.openSnackBar(error.error.message)
    }
    if (error.status == 0) {
      this.message = "Please try again later!";
      this.openSnackBar(this.message);
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  goToSignInPage() {
    this.router.navigate(['auth/login']);
    console.log("login page")
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}