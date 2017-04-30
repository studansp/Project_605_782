import { Injectable } from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';
import {Observable} from "rxjs/Observable";
import {LoginModel} from "./models/LoginModel";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ApiResponse} from "./models/ApiResponse";
import {AccountModel} from "./models/AccountModel";
import {EventModel} from "./models/EventModel";
import {CartItemRequest} from "./models/CartItemRequest";
import {TicketModel} from "./models/TicketModel";
import {OrderModel} from "./models/OrderModel";
import {SectionModel} from "./models/SectionModel";
import {Seat} from "./chooseseats/Seat";

@Injectable()
export class ApiService {
    constructor (private http: Http) {
        this.account = this.getAccountCookie();
    }

    private account:AccountModel;
    private accountCookieName:string='AccountCookie';

    public getAccount():AccountModel{
        return this.account;
    }

    private getAccountCookie():AccountModel {
        var result = document.cookie.split(';')
            .map(c=>c.trim())
            .filter(c=>{ return c.substring(0, this.accountCookieName.length+1) === `${this.accountCookieName}=`;})
            .map(c=>{return decodeURIComponent(c.substring(this.accountCookieName.length+1));});

        if(result==null || result.length===0) {
            return null;
        }

        var parsedAccount = JSON.parse(result[0]);

        return parsedAccount;
    }

    private setAccountCookie(account: string, expDays:number) {
        let d:Date = new Date();
        d.setTime(d.getTime() +  expDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        document.cookie = `${this.accountCookieName}=${account}; ${expires}`;
    }


    public setAccount(account:AccountModel) {
        this.account=account;
        this.setAccountCookie(JSON.stringify(account), 1);
    }

    public clearToken():void {
        this.account=null;
        this.setAccountCookie(null, -1);
    }

    public isAuthenticated():boolean {
        return this.account!=null;
    }

    public authenicate(model:LoginModel):Observable<ApiResponse<AccountModel>> {
        return this.simplePostRequest<AccountModel>("/api/authenticate", model);
    }

    public addToCart(request:CartItemRequest):Observable<ApiResponse<boolean>> {
        return this.simplePostRequest<boolean>("/api/cartitem", request);
    }

    public getSeatsForSection(id: number, eventId:number):Observable<ApiResponse<Array<Seat>>> {
        return this.simpleGetRequest<Array<Seat>>("/api/eventsection?id="+id+"&eventId="+eventId);
    }

    public getSections():Observable<ApiResponse<Array<SectionModel>>> {
        return this.simpleGetRequest<Array<SectionModel>>("/api/sections");
    }

    public removeTicket(id:number):Observable<ApiResponse<OrderModel>> {
        return this.simpleDeleteRequest<OrderModel>("/api/cartitem?id="+id);
    }

    public getCart():Observable<ApiResponse<OrderModel>> {
        return this.simpleGetRequest<OrderModel>("/api/cart");
    }

    public getEvent(id:number):Observable<ApiResponse<EventModel>> {
        return this.simpleGetRequest<EventModel>("/api/event?id="+id);
    }

    public getEvents():Observable<ApiResponse<Array<EventModel>>> {
        return this.simpleGetRequest<Array<EventModel>>("/api/events");
    }

    public getProfile():Observable<ApiResponse<AccountModel>> {
        return this.simpleGetRequest<AccountModel>("/api/account");
    }

    public createAccount(model:AccountModel):Observable<ApiResponse<AccountModel>> {
        return this.simplePostRequest<AccountModel>("/api/account", model);
    }

    public updateProfile(model:AccountModel):Observable<ApiResponse<AccountModel>> {
        return this.simplePutRequest<AccountModel>("/api/account", model);
    }

    public placeOrder():Observable<ApiResponse<OrderModel>> {
        return this.simplePostRequest<OrderModel>("/api/order", {});
    }

    private extractData<T>(res: Response):ApiResponse<T> {
        let result = new ApiResponse<T>();
        result.deserialize(res.json())

        return result;
    }
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        alert(errMsg);
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private getHeaders():Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if(this.isAuthenticated()) {
            headers.append('Authorization', this.account.token);
        }

        return headers;
    }

    private simpleGetRequest<T>(url: string):Observable<ApiResponse<T>> {
        return this.http.get(url, { headers: this.getHeaders() })
            .map((res:Response)=>{ return this.extractData<T>(res)})
            .catch(this.handleError);
    }

    private simplePutRequest<T>(url: string, model: any):Observable<ApiResponse<T>> {
        return this.http.put(url, model, { headers: this.getHeaders() })
            .map((res:Response)=>{ return this.extractData<T>(res)})
            .catch(this.handleError);
    }

    private simpleDeleteRequest<T>(url: string):Observable<ApiResponse<T>> {
        return this.http.delete(url, { headers: this.getHeaders() })
            .map((res:Response)=>{ return this.extractData<T>(res)})
            .catch(this.handleError);
    }

    private simplePostRequest<T>(url: string, model: any):Observable<ApiResponse<T>> {
        return this.http.post(url, model, { headers: this.getHeaders() })
            .map((res:Response)=>{ return this.extractData<T>(res)})
            .catch(this.handleError);
    }
}