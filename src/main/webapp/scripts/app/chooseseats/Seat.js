"use strict";
var Seat = (function () {
    function Seat() {
        this.radius = 5;
        this.buffer = 15;
    }
    Seat.prototype.getCenterX = function () {
        return this.seat * this.buffer;
    };
    Seat.prototype.getCenterY = function () {
        return this.row * this.buffer;
    };
    Seat.prototype.draw = function (ctx) {
        var _this = this;
        if (this.available === false) {
            ctx.getRawContext().fillStyle = "#000000";
        }
        else if (this.selected) {
            ctx.getRawContext().fillStyle = "#0000ff";
        }
        else {
            ctx.getRawContext().fillStyle = "#00ff00";
        }
        ctx.fillPath(function (ctx) { return ctx.arc(_this.getCenterX(), _this.getCenterY(), _this.radius, 0, 2 * Math.PI); });
    };
    Seat.prototype.contains = function (x, y) {
        var cX = this.getCenterX();
        var cY = this.getCenterY();
        var xDiff = cX - x;
        var yDiff = cY - y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff) <= this.radius;
    };
    return Seat;
}());
exports.Seat = Seat;
//# sourceMappingURL=Seat.js.map