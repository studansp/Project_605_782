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
    }
    ApiService.prototype.setToken = function (newToken) {
        this.token = newToken;
    };
    ApiService.prototype.clearToken = function () {
        this.token = null;
    };
    ApiService.prototype.isAuthenticated = function () {
        return this.token != null;
    };
    ApiService.prototype.authenicate = function (model) {
        return this.simplePostRequest("/authenticate", model);
    };
    ApiService.prototype.getEvent = function (id) {
        return this.simpleGetRequest("/event?id=" + id);
    };
    ApiService.prototype.getEvents = function () {
        return this.simpleGetRequest("/events");
    };
    ApiService.prototype.getProfile = function () {
        return this.simpleGetRequest("/account");
    };
    ApiService.prototype.createAccount = function (model) {
        return this.simplePostRequest("/account", model);
    };
    ApiService.prototype.updateProfile = function (model) {
        return this.simplePutRequest("/account", model);
    };
    ApiService.prototype.extractData = function (res) {
        var result = new ApiResponse_1.ApiResponse();
        result.deserialize(res.json());
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
        alert(errMsg);
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ApiService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.isAuthenticated()) {
            headers.append('Authorization', this.token);
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