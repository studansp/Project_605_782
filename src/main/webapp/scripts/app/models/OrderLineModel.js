"use strict";
var OrderLineModel = (function () {
    function OrderLineModel() {
    }
    OrderLineModel.prototype.getCost = function () {
        var sum = 0;
        if (this.tickets != null) {
            for (var i = 0; i < this.tickets.length; i++) {
                sum += this.tickets[i].cost;
            }
        }
        return sum;
    };
    return OrderLineModel;
}());
exports.OrderLineModel = OrderLineModel;
//# sourceMappingURL=OrderLineModel.js.map