"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Section_1 = require("./chooseseats/Section");
var Seat_1 = require("./chooseseats/Seat");
var MouseHandler_1 = require("./chooseseats/MouseHandler");
var ContextContainer_1 = require("./chooseseats/ContextContainer");
var ChooseYourSeatsComponent = (function () {
    function ChooseYourSeatsComponent() {
        this.canvasId = "seatsCanvas";
        this.selectedSeats = new Set();
        this.backButtonSize = 50;
    }
    ChooseYourSeatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sections = this.getSections();
        this.canvas = (document.getElementById(this.canvasId));
        this.ctx = new ContextContainer_1.ContextContainer(this.canvas.getContext("2d"));
        this.mouseHandler = new MouseHandler_1.MouseHandler(this.canvas, function (ev) { return _this.handleCanvasClick(ev); });
        this.start();
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
        var x = pointerEvent.pageX - this.canvas.offsetLeft - this.mouseHandler.getOffsetX();
        var y = pointerEvent.pageY - this.canvas.offsetTop - this.mouseHandler.getOffsetY();
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
    ChooseYourSeatsComponent.prototype.fillSeats = function () {
        this.seats = this.getSeatsForSection(this.selectedSection.id);
    };
    ChooseYourSeatsComponent.prototype.getSeatsForSection = function (id) {
        var rows = 50;
        var columns = 50;
        var currentId = 1;
        var seats = new Array(rows * columns);
        for (var row = 0; row < rows; row++) {
            for (var column = 0; column < columns; column++) {
                var currentSeat = new Seat_1.Seat();
                currentSeat.id = currentId++;
                currentSeat.row = row;
                currentSeat.column = column;
                seats[column + columns * row] = currentSeat;
            }
        }
        return seats;
    };
    ChooseYourSeatsComponent.prototype.getSections = function () {
        var section1 = new Section_1.Section();
        section1.id = 1;
        section1.name = "Section 1";
        section1.priority = 1;
        var section2 = new Section_1.Section();
        section2.id = 2;
        section2.name = "Section 2";
        section2.priority = 2;
        var section3 = new Section_1.Section();
        section3.id = 3;
        section3.name = "Section 3";
        section3.priority = 3;
        return [section1, section2, section3];
    };
    return ChooseYourSeatsComponent;
}());
ChooseYourSeatsComponent = __decorate([
    core_1.Component({
        selector: 'chooseyourseats',
        templateUrl: './templates/chooseyourseats.html'
    })
], ChooseYourSeatsComponent);
exports.ChooseYourSeatsComponent = ChooseYourSeatsComponent;
//# sourceMappingURL=ChooseYourSeatsComponent.js.map