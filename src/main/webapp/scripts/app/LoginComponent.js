"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ApiService_1 = require("./ApiService");
var LoginModel_1 = require("./models/LoginModel");
var ApiResponse_1 = require("./models/ApiResponse");
var LoginComponent = (function () {
    function LoginComponent(apiService) {
        this.apiService = apiService;
        this.model = new LoginModel_1.LoginModel();
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.apiService.authenicate(this.model)
            .subscribe(function (m) { return _this.handleResponse(m); }, function (e) { alert(e); });
    };
    LoginComponent.prototype.handleResponse = function (loginResponse) {
        if (loginResponse.status == ApiResponse_1.ApiResponse.OK) {
            alert("Success: " + loginResponse.model);
        }
        else {
            alert("Invalid username or password");
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './templates/login.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map