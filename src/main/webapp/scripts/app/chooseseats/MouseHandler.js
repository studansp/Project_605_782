"use strict";
var MouseHandler = (function () {
    function MouseHandler(canvas, clickListener) {
        var _this = this;
        this.canvas = canvas;
        this.clickListener = clickListener;
        this.clicking = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.canvas.addEventListener('mousedown', function (ev) { return _this.mouseDown(ev); });
        this.canvas.addEventListener('mousemove', function (ev) { return _this.mouseMove(ev); });
        this.canvas.addEventListener('mouseleave', function (ev) { return _this.mouseUp(ev); });
        this.canvas.addEventListener('mouseup', function (ev) { return _this.mouseUp(ev); });
    }
    MouseHandler.prototype.clearOffset = function () {
        this.offsetX = 0;
        this.offsetY = 0;
    };
    MouseHandler.prototype.getOffsetX = function () {
        return this.offsetX;
    };
    MouseHandler.prototype.getOffsetY = function () {
        return this.offsetY;
    };
    MouseHandler.prototype.mouseDown = function (pointerEvent) {
        this.didMove = false;
        this.clicking = true;
        this.clickX = pointerEvent.clientX;
        this.clickY = pointerEvent.clientY;
    };
    MouseHandler.prototype.mouseUp = function (pointerEvent) {
        this.clicking = false;
        if (this.didMove === false) {
            this.clickListener(pointerEvent);
        }
        else {
            this.mouseMove(pointerEvent);
        }
    };
    MouseHandler.prototype.mouseMove = function (pointerEvent) {
        if (this.clicking) {
            this.didMove = true;
            this.offsetX -= (this.clickX - pointerEvent.clientX);
            this.offsetY -= (this.clickY - pointerEvent.clientY);
            this.clickX = pointerEvent.clientX;
            this.clickY = pointerEvent.clientY;
        }
    };
    return MouseHandler;
}());
exports.MouseHandler = MouseHandler;
//# sourceMappingURL=MouseHandler.js.map