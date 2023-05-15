import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private userService: UserService)  { }


  

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
    const reviewData = this.friendForm.value;
    this.userService.addFriends(reviewData, this.data.idUser, this.data.idMovie).subscribe(
      response => {
        this.dialogRef.close();
        this.openSnackBar(response.message);
      },
    );
  }


}
