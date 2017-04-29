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
var router_1 = require("@angular/router");
var ApiService_1 = require("./ApiService");
var EventModel_1 = require("./models/EventModel");
var CartItemRequest_1 = require("./models/CartItemRequest");
var ChooseYourSeatsComponent_1 = require("./ChooseYourSeatsComponent");
var EventDetailComponent = (function () {
    function EventDetailComponent(route, apiService, router) {
        this.route = route;
        this.apiService = apiService;
        this.router = router;
        this.orderByQuantity = true;
        this.event = new EventModel_1.EventModel();
        this.quantity = 2;
    }
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.chooseyourseats.eventId = params['id'];
            _this.apiService.getEvent(params['id'])
                .subscribe(function (m) {
                _this.event = m.model;
            }, function (e) { _this.router.navigateByUrl("/home"); });
        });
    };
    EventDetailComponent.prototype.toggleChooseYourSeats = function () {
        this.orderByQuantity = !this.orderByQuantity;
    };
    EventDetailComponent.prototype.addQuantityToCart = function () {
        var _this = this;
        if (this.apiService.isAuthenticated()) {
            var request = new CartItemRequest_1.CartItemRequest();
            request.quantity = this.quantity;
            request.eventId = this.event.id;
            this.apiService.addToCart(request)
                .subscribe(function (m) {
                _this.router.navigateByUrl("/cart");
            }, function (e) { alert('error'); });
        }
        else {
            this.router.navigateByUrl('/login');
        }
    };
    return EventDetailComponent;
}());
__decorate([
    core_1.ViewChild('chooseyourseats'),
    __metadata("design:type", ChooseYourSeatsComponent_1.ChooseYourSeatsComponent)
], EventDetailComponent.prototype, "chooseyourseats", void 0);
EventDetailComponent = __decorate([
    core_1.Component({
        selector: 'eventdetail',
        templateUrl: './templates/eventdetail.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, ApiService_1.ApiService, router_1.Router])
], EventDetailComponent);
exports.EventDetailComponent = EventDetailComponent;
//# sourceMappingURL=EventDetailComponent.js.map