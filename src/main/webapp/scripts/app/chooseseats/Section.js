"use strict";
var Section = (function () {
    function Section() {
        this.height = 100;
        this.heightAndBuffer = 110;
        this.width = 200;
    }
    Section.prototype.getMinY = function () {
        return this.priority * this.heightAndBuffer - this.height;
    };
    Section.prototype.draw = function (ctx) {
        var _this = this;
        ctx.getRawContext().fillStyle = "#000000";
        ctx.fillPath(function (ctx) { return ctx.rect(0, _this.getMinY(), _this.width, _this.height); });
        var fontSize = 10;
        var arialAspectRatio = 0.52;
        ctx.getRawContext().fillStyle = "#ffffff";
        ctx.getRawContext().font = fontSize + 'px arial';
        ctx.fillText(this.name, (this.width / 2) - (this.name.length * fontSize / 2) * arialAspectRatio, this.getMinY() + this.height / 2);
    };
    Section.prototype.contains = function (x, y) {
        return x <= this.width && x >= 0 && y >= this.getMinY() && y <= this.getMinY() + this.height;
    };
    return Section;
}());
exports.Section = Section;
//# sourceMappingURL=Section.js.map