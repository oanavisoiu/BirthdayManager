import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { Account } from "../models/account";
import { AccountService } from "../services/account.service";


export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        yearMonthDay: 'YYYY-MM-DD'
    },
};

@Component({
    selector: 'add-new-dialog',
    templateUrl: 'add-new-dialog.html',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
    ]
})
export class AddNewAccountDiagol {
    accountForm!: FormGroup;
    user_id!: string;
    accountSub!: Subscription;
    message!: string;

    constructor(
        public dialogRef: MatDialogRef<AddNewAccountDiagol>,
        private accountService: AccountService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public account: Account,
    ) { }

    ngOnInit(): void {
        this.accountForm = new FormGroup({
            emailAccount: new FormControl(null, [Validators.email]),
            oldPassword: new FormControl(null, [Validators.required]),
            idWebsite: new FormControl(null, [Validators.required]),
        })
    }

    get oldPassword() {
        return this.accountForm.get('oldPassword');
    }

    get startdate() {
        const now = new Date();
        const time = now.toISOString().slice(0, 10);
        //return now.toLocaleDateString();
        return time;
    }



    get idWebsite() {
        return this.accountForm.get('idWebsite')
    }

    get emailAccount() {
        return this.accountForm.get('emailAccount')
    }

    private mapAccountForm(): Account {
        const account: Account = {
            id: '',
            oldPassword: this.oldPassword?.value,
            startDate: this.startdate,
            idUser: this.account.idUser,
            idWebsite: this.idWebsite?.value,
            emailAccount: this.emailAccount?.value
        }
        return account;
    }

    onAddAccount() {
        if (this.accountForm.valid) {
            let account = this.mapAccountForm();
            console.log(account)

            this.accountSub = this.accountService.addUserAccount(account.idUser, account.idWebsite).subscribe(users => {
                let message = users.message;
                let status = users.status;
                if (status === 200 || status === 201) {
                    this.dialogRef.close();
                } else {
                    this.openSnackBar(message)
                }
            },
                error => {
                    this.handleError(error);
                }
            );
        } else {
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
        this.accountSub.unsubscribe();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
