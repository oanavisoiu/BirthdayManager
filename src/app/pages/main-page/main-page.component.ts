import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Friend } from '../../models/friend';
import { AddFriendsComponent } from '../../dialogs/add-friends/add-friends.component';
import { EditFriendsComponent } from 'src/app/dialogs/edit-friends/edit-friends.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  searchValue = '';
  visible = false;
  searchText= '';
  friendById!:Friend;
  message!: string;
  friendList: Friend[] = [];
  user_id!: string;
  filteredData:Friend[]=[];

  listOfColumn = [
    {
      title: 'First Name',
      compare: (a: Friend, b: Friend) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      compare: (a: Friend, b: Friend) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Phone Number',
      compare: (a: Friend, b: Friend) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: 'Birthdate',
      compare: (a: Friend, b: Friend) => {
        const dateA = new Date(a.birthdate);
        const dateB = new Date(b.birthdate);
        return dateA.getTime() - dateB.getTime();
      }
    },
    {
      title: 'City',
      compare: (a: Friend, b: Friend) => a.city.localeCompare(b.city),
    },
  ];

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
      this.filteredData = this.friendList;
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

  open() {
    const dialogRef2 = this.dialog.open(AddFriendsComponent, {
          data: {
            idUser: this.user_id,
          }
        });
  }

  deleteFriend(id: string){
    this.setId();
      this.userService.deleteFriends(id).subscribe(response => {
        this.getFriends();
        console.log(response);
        let message = response.message;
        this.openSnackBar(message);
        console.log(response.message)

      });

  }

  clearFilter() {
    this.searchValue = '';
  }
  openEdit(id:string) {
    this.userService.getFriendById(id).subscribe((data: any) => {
      this.friendById = data.data;
      console.log(this.friendById);
      if (this.friendById) {
        const dialogRef = this.dialog.open(EditFriendsComponent, {
          data: {
            id: this.friendById.id,
            firstName: this.friendById.firstName,
            lastName: this.friendById.lastName,
            phoneNumber: this.friendById.phoneNumber,
            birthdate: this.friendById.birthdate,
            city: this.friendById.city
          }
        });
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

  filterTable() {
    console.log(this.filteredData);
    if (this.searchText) {
      this.filteredData = this.friendList.filter(item =>
        item.firstName.toLowerCase().includes(this.searchText.toLowerCase())
        || item.lastName.toLowerCase().includes(this.searchText.toLowerCase())
        || item.birthdate.toLowerCase().includes(this.searchText.toLowerCase())
        || item.city.toLowerCase().includes(this.searchText.toLowerCase())
        || item.phoneNumber.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
     else {
      this.filteredData = this.friendList;
    }
  }

  setFilteredDataToInitial(){
    this.filteredData=this.friendList;
  }

}
