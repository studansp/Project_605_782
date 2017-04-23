import {Component} from '@angular/core';
import {OrderModel} from "./models/OrderModel";
import {Router} from "@angular/router";
import {ApiService} from "./ApiService";
import {OrderLineModel} from "./models/OrderLineModel";

@Component({
    selector: 'cart',
    templateUrl: './templates/cart.html'
})
export class CartComponent {
    private model: OrderModel;

    constructor(private apiService:ApiService, router:Router) {
        this.model = new OrderModel();
        this.model.lines = new Array<OrderLineModel>();
        if(apiService.isAuthenticated()==false) {
            router.navigateByUrl('/login');
        } else {
            apiService.getCart()
                .subscribe(m => {this.model=m.model;}, e => { router.navigateByUrl('/login'); });
        }
    }
}