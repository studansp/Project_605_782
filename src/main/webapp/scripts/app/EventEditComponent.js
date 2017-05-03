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
var EventEditComponent = (function () {
    function EventEditComponent(route, apiService, router) {
        this.route = route;
        this.apiService = apiService;
        this.router = router;
        this.model = new EventModel_1.EventModel();
    }
    EventEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.apiService.isAuthenticated() == false || this.apiService.getAccount().admin == false) {
            this.router.navigateByUrl('/login');
        }
        else {
            this.route.params.subscribe(function (params) {
                _this.apiService.getEvent(params['id'])
                    .subscribe(function (m) {
                    _this.model = m.model;
                }, function (e) { _this.router.navigateByUrl("/home"); });
            });
        }
    };
    EventEditComponent.prototype.save = function () {
        var _this = this;
        this.apiService.updateEvent(this.model)
            .subscribe(function (m) {
            _this.apiService.showSuccess();
            _this.model = m.model;
        }, function (e) { alert('Invalid event'); });
    };
    EventEditComponent.prototype.getDate = function (date) {
        var parsed = Date.parse(date);
        if (isNaN(parsed))
            return date;
        return parsed;
    };
    return EventEditComponent;
}());
EventEditComponent = __decorate([
    core_1.Component({
        selector: 'eventedit',
        templateUrl: './templates/eventedit.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, ApiService_1.ApiService, router_1.Router])
], EventEditComponent);
exports.EventEditComponent = EventEditComponent;
//# sourceMappingURL=EventEditComponent.js.map