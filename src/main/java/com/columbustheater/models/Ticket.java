package com.columbustheater.models;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
@Table(name="tickets")
public class Ticket extends ModelBase {
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "seatId")
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "eventId")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

    @Column(nullable= false)
    @Digits(integer=12, fraction=2)
    private BigDecimal cost;

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }
}
