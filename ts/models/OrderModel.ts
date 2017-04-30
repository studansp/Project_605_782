import {EventModel} from "./EventModel";
import {TicketModel} from "./TicketModel";
import {OrderLineModel} from "./OrderLineModel";
export class OrderModel {
    public lines:Array<OrderLineModel>;
    get total():number {
        var sum:number=0;

        if(this.lines!=null) {
            for(var i=0;i<this.lines.length;i++) {
                sum+=this.lines[i].getCost();
            }
        }
        return sum;
    }
}