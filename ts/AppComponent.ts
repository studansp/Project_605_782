import { Component } from '@angular/core';
import {ApiService} from "./ApiService";

@Component({
    selector: 'my-app',
    templateUrl: './templates/container.html'
})
export class AppComponent {
    get isAuthenticated():boolean {
        return this.apiService.isAuthenticated();
    }

    constructor(private apiService : ApiService) {}
}