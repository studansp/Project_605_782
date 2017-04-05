"use strict";
var ApiResponse = (function () {
    function ApiResponse() {
    }
    ApiResponse.prototype.deserialize = function (input) {
        if (input) {
            this.status = input.status;
            this.message = input.message;
            this.model = input.model;
        }
        return this;
    };
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=Response.js.map