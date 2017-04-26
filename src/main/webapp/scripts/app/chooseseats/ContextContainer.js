"use strict";
var ContextContainer = (function () {
    function ContextContainer(ctx) {
        this.ctx = ctx;
    }
    ContextContainer.prototype.getRawContext = function () {
        return this.ctx;
    };
    ContextContainer.prototype.fillPath = function (innerDraw) {
        this.ctx.beginPath();
        innerDraw(this.ctx);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
    };
    ContextContainer.prototype.fillText = function (text, x, y) {
        this.ctx.beginPath();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillText(text, x, y);
    };
    return ContextContainer;
}());
exports.ContextContainer = ContextContainer;
//# sourceMappingURL=ContextContainer.js.map