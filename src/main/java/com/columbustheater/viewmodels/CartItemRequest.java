package com.columbustheater.viewmodels;

import com.columbustheater.models.Ticket;

public class CartItemRequest {
    private int eventId;

    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    private Ticket[] tickets;

    public Ticket[] getTickets() {
        return tickets;
    }

    public void setTickets(Ticket[] tickets) {
        this.tickets = tickets;
    }

    public boolean isOrderByQuantity() {
        return tickets==null || tickets.length==0;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
