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
var Seat_1 = require("./chooseseats/Seat");
var MouseHandler_1 = require("./chooseseats/MouseHandler");
var ContextContainer_1 = require("./chooseseats/ContextContainer");
var ApiService_1 = require("./ApiService");
var SectionModel_1 = require("./models/SectionModel");
var CartItemRequest_1 = require("./models/CartItemRequest");
var TicketModel_1 = require("./models/TicketModel");
var router_1 = require("@angular/router");
var ChooseYourSeatsComponent = (function () {
    function ChooseYourSeatsComponent(apiService, router) {
        this.apiService = apiService;
        this.router = router;
        this.sections = [];
        this.seats = [];
        this.canvasId = "seatsCanvas";
        this.selectedSeats = new Set();
        this.backButtonSize = 50;
    }
    ChooseYourSeatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.canvas = (document.getElementById(this.canvasId));
        this.ctx = new ContextContainer_1.ContextContainer(this.canvas.getContext("2d"));
        this.mouseHandler = new MouseHandler_1.MouseHandler(this.canvas, function (ev) { return _this.handleCanvasClick(ev); });
        this.apiService.getSections()
            .subscribe(function (m) {
            for (var i = 0; i < m.model.length; i++) {
                var section = new SectionModel_1.SectionModel();
                section.name = m.model[i].name;
                section.id = m.model[i].id;
                section.priority = i + 1;
                _this.sections.push(section);
            }
            _this.start();
        }, function (e) { alert('Unable to retrieve sections.'); });
    };
    ChooseYourSeatsComponent.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.draw();
        }, 100);
    };
    ChooseYourSeatsComponent.prototype.getFirstContains = function (arg, x, y) {
        for (var i = 0; i < arg.length; i++) {
            var toCheck = arg[i];
            if (toCheck.contains(x, y))
                return toCheck;
        }
        return null;
    };
    ChooseYourSeatsComponent.prototype.handleSectionViewClick = function (x, y) {
        var resultSection = this.getFirstContains(this.sections, x, y);
        if (resultSection != null) {
            this.mouseHandler.clearOffset();
            this.selectedSection = resultSection;
            this.fillSeats();
        }
    };
    ChooseYourSeatsComponent.prototype.handleSeatViewClick = function (x, y) {
        var backX = x + this.mouseHandler.getOffsetX();
        var backY = y + this.mouseHandler.getOffsetY();
        if (backX >= 0 && backX <= this.backButtonSize &&
            backY >= 0 && backY <= this.backButtonSize) {
            this.mouseHandler.clearOffset();
            this.selectedSeats.clear();
            this.selectedSection = null;
        }
        else {
            var resultSeat = this.getFirstContains(this.seats, x, y);
            if (resultSeat != null) {
                var newSelected = !resultSeat.selected;
                resultSeat.selected = newSelected;
                if (newSelected) {
                    this.selectedSeats.add(resultSeat);
                }
                else {
                    this.selectedSeats.delete(resultSeat);
                }
            }
        }
    };
    ChooseYourSeatsComponent.prototype.handleCanvasClick = function (pointerEvent) {
        var rect = this.canvas.getBoundingClientRect();
        var x = pointerEvent.clientX - rect.left - this.mouseHandler.getOffsetX();
        var y = pointerEvent.clientY - rect.top - this.mouseHandler.getOffsetY();
        if (this.selectedSection == null) {
            this.handleSectionViewClick(x, y);
        }
        else {
            this.handleSeatViewClick(x, y);
        }
    };
    ChooseYourSeatsComponent.prototype.drawArray = function (toDraw) {
        for (var i = 0; i < toDraw.length; i++) {
            toDraw[i].draw(this.ctx);
        }
    };
    ChooseYourSeatsComponent.prototype.drawOverlay = function () {
        var _this = this;
        if (this.selectedSection != null) {
            this.ctx.getRawContext().fillStyle = "#ff0000";
            this.ctx.fillPath(function (ctx) { return ctx.rect(0, 0, _this.backButtonSize, _this.backButtonSize); });
            this.ctx.getRawContext().fillStyle = "#ffffff";
            this.ctx.getRawContext().font = '10px arial';
            this.ctx.fillText("Back", this.backButtonSize / 2 - 10, this.backButtonSize / 2 + 5);
        }
    };
    ChooseYourSeatsComponent.prototype.draw = function () {
        this.ctx.getRawContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.getRawContext().save();
        this.ctx.getRawContext().translate(this.mouseHandler.getOffsetX(), this.mouseHandler.getOffsetY());
        if (this.selectedSection == null) {
            this.drawArray(this.sections);
        }
        else {
            this.drawArray(this.seats);
        }
        this.ctx.getRawContext().restore();
        this.drawOverlay();
    };
    ChooseYourSeatsComponent.prototype.addToCart = function () {
        var _this = this;
        if (this.selectedSeats.size == 0) {
            this.apiService.showError('You must select at least one seat');
        }
        else {
            var request = new CartItemRequest_1.CartItemRequest();
            var tickets = new Array();
            this.selectedSeats.forEach(function (seat) {
                var ticket = new TicketModel_1.TicketModel();
                ticket.id = seat.id;
                tickets.push(ticket);
            });
            request.tickets = tickets;
            this.apiService.addToCart(request)
                .subscribe(function (m) {
                _this.router.navigateByUrl("/cart");
            }, function (e) { alert('error'); });
        }
    };
    ChooseYourSeatsComponent.prototype.fillSeats = function () {
        var _this = this;
        while (this.seats.length != 0)
            this.seats.pop();
        this.apiService.getSeatsForSection(this.selectedSection.id, this.eventId)
            .subscribe(function (m) {
            for (var i = 0; i < m.model.length; i++) {
                var seat = new Seat_1.Seat();
                seat.id = m.model[i].id;
                seat.row = m.model[i].row;
                seat.seat = m.model[i].seat;
                seat.available = m.model[i].available;
                _this.seats.push(seat);
            }
        }, function (e) { alert('Unable to retrieve seats.'); });
    };
    return ChooseYourSeatsComponent;
}());
ChooseYourSeatsComponent = __decorate([
    core_1.Component({
        selector: 'chooseyourseats',
        templateUrl: './templates/chooseyourseats.html'
    }),
    __metadata("design:paramtypes", [ApiService_1.ApiService, router_1.Router])
], ChooseYourSeatsComponent);
exports.ChooseYourSeatsComponent = ChooseYourSeatsComponent;
//# sourceMappingURL=ChooseYourSeatsComponent.js.map