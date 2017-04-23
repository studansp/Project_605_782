"use strict";
var CartItemRequest = (function () {
    function CartItemRequest() {
    }
    CartItemRequest.prototype.isOrderByQuantity = function () {
        return this.tickets == null || this.tickets.length == 0;
    };
    return CartItemRequest;
}());
exports.CartItemRequest = CartItemRequest;
//# sourceMappingURL=CartItemRequest.js.map