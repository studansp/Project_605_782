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
var OrderLineModel_1 = require("./models/OrderLineModel");
var CartComponent = (function () {
    function CartComponent(apiService, router) {
        this.apiService = apiService;
        this.router = router;
        this.isCheckingOut = false;
        this.isOrderComplete = false;
        this.title = "Cart";
        this.shipType = "0";
        this.model = new OrderModel_1.OrderModel();
        this.model.lines = new Array();
        if (apiService.isAuthenticated() == false) {
            router.navigateByUrl('/login');
        }
        else {
            this.account = apiService.getAccount();
            this.loadCart();
        }
    }
    CartComponent.prototype.loadCart = function () {
        var _this = this;
        this.apiService.getCart()
            .subscribe(function (m) {
            _this.mapCart(m.model);
        }, function (e) { _this.router.navigateByUrl('/login'); });
    };
    CartComponent.prototype.mapCart = function (model) {
        while (this.model.lines.length > 0)
            this.model.lines.pop();
        for (var i = 0; i < model.lines.length; i++) {
            var rawLine = model.lines[i];
            var line = new OrderLineModel_1.OrderLineModel();
            line.event = rawLine.event;
            line.tickets = new Array();
            for (var j = 0; j < rawLine.tickets.length; j++) {
                line.tickets.push(rawLine.tickets[j]);
            }
            this.model.lines.push(line);
        }
    };
    CartComponent.prototype.remove = function (ticket) {
        var _this = this;
        this.apiService.removeTicket(ticket.id)
            .subscribe(function (m) {
            for (var i = 0; i < _this.model.lines.length; i++) {
                var currentLine = _this.model.lines[i];
                for (var j = 0; j < currentLine.tickets.length; j++) {
                    if (currentLine.tickets[i].id == ticket.id) {
                        currentLine.tickets.splice(i, 1);
                    }
                }
            }
        }, function (e) { _this.router.navigateByUrl('/login'); });
    };
    CartComponent.prototype.initCheckout = function () {
        this.isCheckingOut = true;
        this.title = "Checkout";
    };
    CartComponent.prototype.placeOrder = function () {
        var _this = this;
        this.title = "Order Complete";
        this.apiService.placeOrder()
            .subscribe(function () {
            _this.isOrderComplete = true;
        }, function (e) { alert(e); });
    };
    Object.defineProperty(CartComponent.prototype, "emptyCart", {
        get: function () {
            return this.model == null
                || this.model.lines == null
                || this.model.lines.length == 0;
        },
        enumerable: true,
        configurable: true
    });
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