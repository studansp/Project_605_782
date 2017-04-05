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
ApiResponse.OK = 200;
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map