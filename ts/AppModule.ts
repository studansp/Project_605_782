import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './AppComponent';
import {LoginComponent} from "./LoginComponent";
import {HomeComponent} from "./HomeComponent";
import {ApiService} from "./ApiService";
import {EventsComponent} from "./EventsComponent";
import {ProfileComponent} from "./ProfileComponent";
import {CartComponent} from "./CartComponent";

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'events', component: EventsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ AppComponent, LoginComponent, HomeComponent, EventsComponent, ProfileComponent, CartComponent ],
    bootstrap:    [ AppComponent ],
    providers: [ ApiService ]
})
export class AppModule { }