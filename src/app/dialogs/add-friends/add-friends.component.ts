import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {
  friendForm!:FormGroup;
  data:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private dialogRef: MatDialogRef<AddFriendsComponent>,
    private userService: UserService,
    private _snackBar: MatSnackBar)  { this.data = dataDialog;
      console.log(this.data); }


  

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.friendForm = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      phoneNumber: new FormControl(""),
      birthdate: new FormControl(""),
      city: new FormControl(""),
    });
  }
  
  addFriend() {
    const friendData = this.friendForm.value;
    this.userService.addUserFriends(friendData,this.data.idUser).subscribe(
      response => {
        this.dialogRef.close();
        this.openSnackBar(response.message);
      },
    );
  }
  
  

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
  }


}
