"use strict";
var OrderModel = (function () {
    function OrderModel() {
    }
    Object.defineProperty(OrderModel.prototype, "total", {
        get: function () {
            var sum = 0;
            if (this.lines != null) {
                for (var i = 0; i < this.lines.length; i++) {
                    sum += this.lines[i].getCost();
                }
            }
            return sum;
        },
        enumerable: true,
        configurable: true
    });
    return OrderModel;
}());
exports.OrderModel = OrderModel;
//# sourceMappingURL=OrderModel.js.map