import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './AppComponent';
import {LoginComponent} from "./LoginComponent";
import {HomeComponent} from "./HomeComponent";
import {ApiService} from "./ApiService";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ AppComponent, LoginComponent, HomeComponent ],
    bootstrap:    [ AppComponent ],
    providers: [ ApiService ]
})
export class AppModule { }