"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var AppComponent_1 = require("./AppComponent");
var LoginComponent_1 = require("./LoginComponent");
var HomeComponent_1 = require("./HomeComponent");
var ApiService_1 = require("./ApiService");
var appRoutes = [
    { path: 'login', component: LoginComponent_1.LoginComponent },
    { path: '', component: HomeComponent_1.HomeComponent },
    { path: 'home', component: HomeComponent_1.HomeComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule, router_1.RouterModule.forRoot(appRoutes)],
        declarations: [AppComponent_1.AppComponent, LoginComponent_1.LoginComponent, HomeComponent_1.HomeComponent],
        bootstrap: [AppComponent_1.AppComponent],
        providers: [ApiService_1.ApiService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=AppModule.js.map