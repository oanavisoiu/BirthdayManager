import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddNewAccountDiagol } from '../components/add-new-dialog';
import { Account } from '../models/account';
import { User } from '../models/user';
import { Website } from '../models/website';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  showFiller = false;
  displayedColumns = ['accountName', 'url'
    // , 'expiration-date', 'password-security'
  ];
  clickedRow!: Website;
  clickedRows = new Set<Website>()

  website!: Website;
  account!: Account;
  dataSource!: MatTableDataSource<Website>;
  public accountsList: Website[] = [];
  private accountSub!: Subscription;
  message!: string;

  userSub!: Subscription;
  usersList: User[] = [];
  user_id!: string;

  oldPassword!: string;
  startDate!: Date;
  endDate!: Date;
  idWebsite!: string;
  emailAccount!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public accountService: AccountService, public userService: UserService, private route: ActivatedRoute,
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

    this.accountSub = this.accountService.getUserAccounts(this.user_id).subscribe(accounts => {
      this.accountsList = accounts.data as Website[];
      this.dataSource = new MatTableDataSource(this.accountsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.accountsList)
      if (this.accountsList.length === 0 && accounts.status === 200) {
        this.message = 'There is no account added yet.'
        this.openSnackBar(this.message)
      }
    },
      error => {
        this.handleError(error);
      }
    )
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
    if (error.status == 400 || error.status == 500 || error.status == 404) {
      this.message = error.error.message;
      this.openSnackBar(error.error.message)
    }
    if (error.status == 0) {
      this.message = "Please try again later!";
      this.openSnackBar(this.message);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDetails(id: any): void {
    console.log(id);
    //this.router.navigate(['', id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewAccountDiagol, {
      width: '500px',
      height: '400px',
      data: {
        oldPassword: this.oldPassword,
        startDate: this.startDate,
        endDate: this.endDate,
        idUser: this.user_id,
        idWebsite: this.idWebsite,
        emailAccount: this.emailAccount
      },
    });
    console.log("Add new account dialog open.")


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.account = result;
      //console.log(this.account)
    });
  }

  ngOnDestroy(): void {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }

}
