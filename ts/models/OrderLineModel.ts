import {EventModel} from "./EventModel";
import {TicketModel} from "./TicketModel";
export class OrderLineModel {
    public event:EventModel;
    public tickets:TicketModel[];
}