import { Injectable } from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';
import {Observable} from "rxjs/Observable";
import {LoginModel} from "./models/LoginModel";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ApiResponse} from "./models/ApiResponse";

@Injectable()
export class ApiService {
    private headers:Headers;
    constructor (private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    public authenicate(model:LoginModel):Observable<ApiResponse<string>> {
        return this.simplePostRequest<string>("/authenticate", model);
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

    private simplePostRequest<T>(url: string, model: any):Observable<ApiResponse<T>> {
        return this.http.post(url, model, { headers: this.headers })
            .map((res:Response)=>{ return this.extractData<T>(res)})
            .catch(this.handleError);
    }
}