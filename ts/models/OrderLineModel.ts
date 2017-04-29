import {EventModel} from "./EventModel";
import {TicketModel} from "./TicketModel";
export class OrderLineModel {
    public event:EventModel;
    public tickets:TicketModel[];

    public getCost():number{
        var sum:number=0;

        if(this.tickets!=null) {
            for(var i=0;i<this.tickets.length;i++) {
                sum+=this.tickets[i].cost;
            }
        }

        return sum;
    }
}