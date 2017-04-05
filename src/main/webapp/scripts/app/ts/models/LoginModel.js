"use strict";
var LoginModel = (function () {
    function LoginModel() {
    }
    Object.defineProperty(LoginModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginModel.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    return LoginModel;
}());
exports.LoginModel = LoginModel;
//# sourceMappingURL=LoginModel.js.map