import {TicketModel} from "./TicketModel";

export class CartItemRequest {
    public eventId:number;
    public quantity:number;
    public tickets:Array<TicketModel>;

    public isOrderByQuantity():boolean {
        return this.tickets==null || this.tickets.length==0;
    }
}