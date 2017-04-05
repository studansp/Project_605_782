import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }  from './AppComponent';
import {LoginComponent} from "./LoginComponent";
import {ApiService} from "./ApiService";

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule ],
    declarations: [ AppComponent, LoginComponent ],
    bootstrap:    [ AppComponent ],
    providers: [ ApiService ]
})
export class AppModule { }