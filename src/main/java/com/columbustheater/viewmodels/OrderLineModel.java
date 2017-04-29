package com.columbustheater.viewmodels;

import com.columbustheater.models.Event;

import java.math.BigInteger;
import java.util.List;

public class OrderLineModel {
    private Event event;
    private List<TicketModel> tickets;

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public List<TicketModel> getTickets() {
        return tickets;
    }

    public void setTickets(List<TicketModel> tickets) {
        this.tickets = tickets;
    }
}
