import { Component } from '@angular/core';
import {AccountModel} from "./models/AccountModel";
import {ApiService} from "./ApiService";
import {Router} from "@angular/router";
import {ApiResponse} from "./models/ApiResponse";

@Component({
    selector: 'profile',
    templateUrl: './templates/profile.html'
})
export class ProfileComponent {
    private model:AccountModel;

    constructor(private apiService:ApiService, router:Router) {
        this.model = new AccountModel();

        if(apiService.isAuthenticated()==false) {
            router.navigateByUrl('/login');
        } else {
            apiService.getProfile()
                .subscribe(m => {this.model=m.model;}, e => { router.navigateByUrl('/login'); });
        }
    }

    public updateProfile():void {
        this.apiService.updateProfile(this.model)
            .subscribe(m => this.handleResponse(m), e => { alert(e)});
    }

    private handleResponse(response: ApiResponse<AccountModel>) {
        if(response.model!=null) {
            this.model = response.model;
            this.model.token = this.apiService.getAccount().token;
            this.apiService.setAccount(this.model);
        } else {
            alert("Test error.")
        }
    }
}