import {Component} from '@angular/core';
import {OrderModel} from "./models/OrderModel";
import {Router} from "@angular/router";
import {ApiService} from "./ApiService";
import {OrderLineModel} from "./models/OrderLineModel";
import {TicketModel} from "./models/TicketModel";
import {AccountModel} from "./models/AccountModel";

@Component({
    selector: 'cart',
    templateUrl: './templates/cart.html'
})
export class CartComponent {
    public model: OrderModel;
    public isCheckingOut:boolean=false;
    public isOrderComplete:boolean=false;
    public account:AccountModel;
    public title:String="Cart";
    public shipType:string="0";

    constructor(private apiService:ApiService, private router:Router) {
        this.model = new OrderModel();
        this.model.lines = new Array<OrderLineModel>();
        if(apiService.isAuthenticated()==false) {
            router.navigateByUrl('/login');
        } else {
            this.account = apiService.getAccount();
            this.loadCart();
        }
    }

    private loadCart() {
        this.apiService.getCart()
            .subscribe(m => {
                this.mapCart(m.model);

            }, e => { this.router.navigateByUrl('/login'); });
    }

    private mapCart(model:OrderModel) {
        while(this.model.lines.length>0)
            this.model.lines.pop();

        for(var i=0;i<model.lines.length;i++) {
            var rawLine = model.lines[i];
            var line:OrderLineModel = new OrderLineModel();
            line.event = rawLine.event;
            line.tickets = new Array<TicketModel>();

            for(var j=0;j<rawLine.tickets.length;j++) {
                line.tickets.push(rawLine.tickets[j]);
            }

            this.model.lines.push(line);
        }
    }

    public remove(ticket:TicketModel):void {

        for(var i=0;i<this.model.lines.length;i++) {
            var currentLine = this.model.lines[i];

            for(var j=0;j<currentLine.tickets.length;j++) {
                if(currentLine.tickets[j].id==ticket.id) {
                    currentLine.tickets.splice(j,1);
                }
            }
        }

        this.apiService.removeTicket(ticket.id)
            .subscribe(m => {
            }, e => { this.router.navigateByUrl('/login'); });
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