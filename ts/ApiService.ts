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

@Injectable()
export class ApiService {
    constructor (private http: Http) {}

    private token:string;

    public setToken(newToken:string) {
        this.token=newToken;
    }

    public clearToken():void {
        this.token=null;
    }

    public isAuthenticated():boolean {
        return this.token!=null;
    }

    public authenicate(model:LoginModel):Observable<ApiResponse<string>> {
        return this.simplePostRequest<string>("/authenticate", model);
    }

    public addToCart(request:CartItemRequest):Observable<ApiResponse<boolean>> {
        return this.simplePostRequest<boolean>("/cartitem", request);
    }

    public getEvent(id:number):Observable<ApiResponse<EventModel>> {
        return this.simpleGetRequest<EventModel>("/event?id="+id);
    }

    public getEvents():Observable<ApiResponse<Array<EventModel>>> {
        return this.simpleGetRequest<Array<EventModel>>("/events");
    }

    public getProfile():Observable<ApiResponse<AccountModel>> {
        return this.simpleGetRequest<AccountModel>("/account");
    }

    public createAccount(model:AccountModel):Observable<ApiResponse<AccountModel>> {
        return this.simplePostRequest<AccountModel>("/account", model);
    }

    public updateProfile(model:AccountModel):Observable<ApiResponse<AccountModel>> {
        return this.simplePutRequest<AccountModel>("/account", model);
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
            headers.append('Authorization', this.token);
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

    private simplePostRequest<T>(url: string, model: any):Observable<ApiResponse<T>> {
        return this.http.post(url, model, { headers: this.getHeaders() })
            .map((res:Response)=>{ return this.extractData<T>(res)})
            .catch(this.handleError);
    }
}