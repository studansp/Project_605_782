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
var AccountModel_1 = require("./models/AccountModel");
var ApiService_1 = require("./ApiService");
var router_1 = require("@angular/router");
var CreateAccountComponent = (function () {
    function CreateAccountComponent(apiService, router) {
        this.apiService = apiService;
        this.router = router;
        this.model = new AccountModel_1.AccountModel();
    }
    CreateAccountComponent.prototype.createAccount = function () {
        var _this = this;
        if (this.model.password != this.model.confirmpassword) {
            this.apiService.showError('Passwords must match');
            return;
        }
        this.apiService.createAccount(this.model)
            .subscribe(function (m) { return _this.handleResponse(m); }, function (e) { });
    };
    CreateAccountComponent.prototype.handleResponse = function (response) {
        if (response.model != null) {
            this.router.navigateByUrl('/login');
        }
    };
    return CreateAccountComponent;
}());
CreateAccountComponent = __decorate([
    core_1.Component({
        selector: 'createaccount',
        templateUrl: './templates/createaccount.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService, router_1.Router])
], CreateAccountComponent);
exports.CreateAccountComponent = CreateAccountComponent;
//# sourceMappingURL=CreateAccountComponent.js.map