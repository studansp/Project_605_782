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
var OrderModel_1 = require("./models/OrderModel");
var router_1 = require("@angular/router");
var ApiService_1 = require("./ApiService");
var CartComponent = (function () {
    function CartComponent(apiService, router) {
        var _this = this;
        this.apiService = apiService;
        this.model = new OrderModel_1.OrderModel();
        this.model.lines = new Array();
        if (apiService.isAuthenticated() == false) {
            router.navigateByUrl('/login');
        }
        else {
            apiService.getCart()
                .subscribe(function (m) { _this.model = m.model; }, function (e) { router.navigateByUrl('/login'); });
        }
    }
    return CartComponent;
}());
CartComponent = __decorate([
    core_1.Component({
        selector: 'cart',
        templateUrl: './templates/cart.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService, router_1.Router])
], CartComponent);
exports.CartComponent = CartComponent;
//# sourceMappingURL=CartComponent.js.map