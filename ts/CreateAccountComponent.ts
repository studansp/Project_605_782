import { Component } from '@angular/core';
import {AccountModel} from "./models/AccountModel";
import {ApiService} from "./ApiService";
import {Router} from "@angular/router";
import {ApiResponse} from "./models/ApiResponse";

@Component({
    selector: 'createaccount',
    templateUrl: './templates/createaccount.html'
})


export class CreateAccountComponent {
    private model:AccountModel;

    constructor(private apiService:ApiService, private router:Router) {
        this.model = new AccountModel();
    }

    public createAccount():void {
        this.apiService.createAccount(this.model)
            .subscribe(m => this.handleResponse(m), e => {});
    }

    private handleResponse(response: ApiResponse<AccountModel>) {
        if(response.model!=null) {
            this.router.navigateByUrl('/login');
        }
    }
}