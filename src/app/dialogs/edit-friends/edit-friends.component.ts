import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Friend } from 'src/app/models/friend';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-friends',
  templateUrl: './edit-friends.component.html',
  styleUrls: ['./edit-friends.component.css']
})
export class EditFriendsComponent implements OnInit {

  friend!: Friend;
  friendForm!: FormGroup;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditFriendsComponent>,
   
   private userService: UserService,
    private _snackBar: MatSnackBar){

    this.friend=data;
    console.log(this.friend);

  }
 

  ngOnInit() {
    this.initForm();
  }


  initForm(){
    this.friendForm = new FormGroup({
      firstName: new FormControl(this.friend.firstName),
      lastName: new FormControl(this.friend.lastName),
      phoneNumber: new FormControl(this.friend.phoneNumber),
      birthdate: new FormControl(this.friend.birthdate),
      city: new FormControl(this.friend.city),
      
    });
  }
  
  edit(id: string) {
    const updatedMovie = this.friendForm.value;
    this.userService.updateUser(id, updatedMovie).subscribe(
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
