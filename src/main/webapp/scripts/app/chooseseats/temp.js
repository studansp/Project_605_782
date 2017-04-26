"use strict";
var Section_1 = require("./Section");
var Seat_1 = require("./Seat");
var ContextContainer_1 = require("./ContextContainer");
var MouseHandler_1 = require("./MouseHandler");
var Helper = (function () {
    function Helper() {
        var _this = this;
        this.canvasId = "seatsCanvas";
        this.selectedSeats = new Set();
        this.backButtonSize = 50;
        this.sections = this.getSections();
        this.canvas = (document.getElementById(this.canvasId));
        this.ctx = new ContextContainer_1.ContextContainer(this.canvas.getContext("2d"));
        this.mouseHandler = new MouseHandler_1.MouseHandler(this.canvas, function (ev) { return _this.handleCanvasClick(ev); });
    }
    Helper.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.draw();
        }, 100);
    };
    Helper.prototype.getFirstContains = function (arg, x, y) {
        for (var i = 0; i < arg.length; i++) {
            var toCheck = arg[i];
            if (toCheck.contains(x, y))
                return toCheck;
        }
        return null;
    };
    Helper.prototype.handleSectionViewClick = function (pointerEvent, x, y) {
        var resultSection = this.getFirstContains(this.sections, x, y);
        if (resultSection != null) {
            this.mouseHandler.clearOffset();
            this.selectedSection = resultSection;
            this.fillSeats();
        }
    };
    Helper.prototype.handleSeatViewClick = function (pointerEvent, x, y) {
        if (pointerEvent.clientX >= 0 &&
            pointerEvent.clientX <= this.backButtonSize &&
            pointerEvent.clientY >= 0 &&
            pointerEvent.clientY <= this.backButtonSize) {
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
    Helper.prototype.handleCanvasClick = function (pointerEvent) {
        var x = pointerEvent.clientX + this.mouseHandler.getOffsetX();
        var y = pointerEvent.clientY + this.mouseHandler.getOffsetY();
        if (this.selectedSection == null) {
            this.handleSectionViewClick(pointerEvent, x, y);
        }
        else {
            this.handleSeatViewClick(pointerEvent, x, y);
        }
    };
    Helper.prototype.drawArray = function (toDraw) {
        for (var i = 0; i < toDraw.length; i++) {
            toDraw[i].draw(this.ctx);
        }
    };
    Helper.prototype.drawOverlay = function () {
        var _this = this;
        if (this.selectedSection != null) {
            this.ctx.getRawContext().fillStyle = "#ff0000";
            this.ctx.fillPath(function (ctx) { return ctx.rect(0, 0, _this.backButtonSize, _this.backButtonSize); });
            this.ctx.getRawContext().fillStyle = "#ffffff";
            this.ctx.getRawContext().font = '10px arial';
            this.ctx.fillText("Back", this.backButtonSize / 2 - 10, this.backButtonSize / 2 + 5);
        }
    };
    Helper.prototype.draw = function () {
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
    Helper.prototype.fillSeats = function () {
        this.seats = this.getSeatsForSection(this.selectedSection.id);
    };
    Helper.prototype.getSeatsForSection = function (id) {
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
    Helper.prototype.getSections = function () {
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
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=temp.js.map