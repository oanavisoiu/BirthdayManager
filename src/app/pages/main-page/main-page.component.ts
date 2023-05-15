import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { Friend } from '../../models/friend';
import { AddFriendsComponent } from '../../dialogs/add-friends/add-friends.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  searchValue = '';
  visible = false;
 

  message!: string;
  friendList: Friend[] = [];
  user_id!: string;



  constructor(
    public userService: UserService, private route: ActivatedRoute,
    private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {

  }

  setId() {
    this.route.params.subscribe(
      (params: Params) => {
        this.user_id = params['id'];
      }
    );
  }

  ngOnInit(): void {
    this.setId();
    this.getFriends();
  }

  getFriends() {
    this.setId();
    this.userService.getFriends(this.user_id).subscribe((data: any) => {
      this.friendList = data.data as Friend[];
   console.log(this.friendList);
    });

  }
  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
  }

  openAddFriends() {
    const dialogRef = this.dialog.open(AddFriendsComponent, {
          data: {
            idUser: this.user_id,
          }
        });
  }



  reset(): void {
    this.searchValue = '';
    this.search();
  }


  listOfDisplayData = [...this.friendList];
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.friendList.filter((item: Friend) => item.firstName.indexOf(this.searchValue) !== -1);
  }
}
 

