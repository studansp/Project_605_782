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
    public model: OrderModel;
    public isCheckingOut:boolean=false;
    public isOrderComplete:boolean=false;
    public title:String="Cart";

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

    public initCheckout():void{
        this.isCheckingOut = true;
        this.title = "Checkout";
    }

    public placeOrder():void {
        this.title = "Order Complete";

        this.apiService.placeOrder()
            .subscribe(() => {
                this.isOrderComplete=true;
            }, e => { alert(e);});
    }

    public get emptyCart():boolean{
        return this.model==null
            || this.model.lines==null
            || this.model.lines.length==0;
    }
}