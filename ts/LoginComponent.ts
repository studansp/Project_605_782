import { Component } from '@angular/core';
import {ApiService} from "./ApiService";
import {LoginModel} from "./models/LoginModel";
import {ApiResponse} from "./models/ApiResponse";
import {Router} from '@angular/router'
import {AccountModel} from "./models/AccountModel";

@Component({
    selector: 'login',
    templateUrl: './templates/login.html'
})
export class LoginComponent {
    private model:LoginModel;

    constructor(private apiService:ApiService, private router:Router) {
        apiService.clearToken();
        this.model = new LoginModel();
    }
    onSubmit() {
        this.apiService.authenicate(this.model)
            .subscribe(m => this.handleResponse(m), e => { alert(e)});
    }

    private handleResponse(loginResponse: ApiResponse<AccountModel>) {
        if(loginResponse.model!=null) {
            this.apiService.setAccount(loginResponse.model);
            this.router.navigateByUrl("/home");
        } else {
            alert("Invalid username or password");
        }
    }
}