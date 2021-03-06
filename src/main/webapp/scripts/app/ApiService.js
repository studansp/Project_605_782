"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var ApiResponse_1 = require("./models/ApiResponse");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
        this.accountCookieName = 'AccountCookie';
        this.account = this.getAccountCookie();
    }
    ApiService.prototype.getAccount = function () {
        return this.account;
    };
    ApiService.prototype.showSuccess = function () {
        window["success"].show();
    };
    ApiService.prototype.getAccountCookie = function () {
        var _this = this;
        var result = document.cookie.split(';')
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return c.substring(0, _this.accountCookieName.length + 1) === _this.accountCookieName + "="; })
            .map(function (c) { return decodeURIComponent(c.substring(_this.accountCookieName.length + 1)); });
        if (result == null || result.length === 0) {
            return null;
        }
        var parsedAccount = JSON.parse(result[0]);
        return parsedAccount;
    };
    ApiService.prototype.setAccountCookie = function (account, expDays) {
        var d = new Date();
        d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = this.accountCookieName + "=" + account + "; " + expires;
    };
    ApiService.prototype.setAccount = function (account) {
        this.account = account;
        this.setAccountCookie(JSON.stringify(account), 1);
    };
    ApiService.prototype.clearToken = function () {
        this.account = null;
        this.setAccountCookie(null, -1);
    };
    ApiService.prototype.isAuthenticated = function () {
        return this.account != null;
    };
    ApiService.prototype.getOrders = function () {
        return this.simpleGetRequest("/api/orders");
    };
    ApiService.prototype.authenicate = function (model) {
        return this.simplePostRequest("/api/authenticate", model);
    };
    ApiService.prototype.addToCart = function (request) {
        return this.simplePostRequest("/api/cartitem", request);
    };
    ApiService.prototype.getSeatsForSection = function (id, eventId) {
        return this.simpleGetRequest("/api/eventsection?id=" + id + "&eventId=" + eventId);
    };
    ApiService.prototype.getSections = function () {
        return this.simpleGetRequest("/api/sections");
    };
    ApiService.prototype.removeTicket = function (id) {
        return this.simpleDeleteRequest("/api/cartitem?id=" + id);
    };
    ApiService.prototype.getCart = function () {
        return this.simpleGetRequest("/api/cart");
    };
    ApiService.prototype.getEvent = function (id) {
        return this.simpleGetRequest("/api/event?id=" + id);
    };
    ApiService.prototype.getEvents = function () {
        return this.simpleGetRequest("/api/events");
    };
    ApiService.prototype.getProfile = function () {
        return this.simpleGetRequest("/api/account");
    };
    ApiService.prototype.createAccount = function (model) {
        return this.simplePostRequest("/api/account", model);
    };
    ApiService.prototype.updateProfile = function (model) {
        return this.simplePutRequest("/api/account", model);
    };
    ApiService.prototype.placeOrder = function () {
        return this.simplePostRequest("/api/order", {});
    };
    ApiService.prototype.updateEvent = function (model) {
        return this.simplePutRequest("/api/event", model);
    };
    ApiService.prototype.extractData = function (res) {
        var result = new ApiResponse_1.ApiResponse();
        result.deserialize(res.json());
        if (result.model == null) {
            this.showError(result.message || "Unknown error");
        }
        return result;
    };
    ApiService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.showError(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ApiService.prototype.showError = function (message) {
        document.getElementById('errorModalContent').innerHTML = message;
        document.getElementById('errorModal').click();
    };
    ApiService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.isAuthenticated()) {
            headers.append('Authorization', this.account.token);
        }
        return headers;
    };
    ApiService.prototype.simpleGetRequest = function (url) {
        var _this = this;
        return this.http.get(url, { headers: this.getHeaders() })
            .map(function (res) { return _this.extractData(res); })
            .catch(this.handleError);
    };
    ApiService.prototype.simplePutRequest = function (url, model) {
        var _this = this;
        return this.http.put(url, model, { headers: this.getHeaders() })
            .map(function (res) { return _this.extractData(res); })
            .catch(this.handleError);
    };
    ApiService.prototype.simpleDeleteRequest = function (url) {
        var _this = this;
        return this.http.delete(url, { headers: this.getHeaders() })
            .map(function (res) { return _this.extractData(res); })
            .catch(this.handleError);
    };
    ApiService.prototype.simplePostRequest = function (url, model) {
        var _this = this;
        return this.http.post(url, model, { headers: this.getHeaders() })
            .map(function (res) { return _this.extractData(res); })
            .catch(this.handleError);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=ApiService.js.map