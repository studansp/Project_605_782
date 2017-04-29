package com.columbustheater.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="orders")
public class Order extends ModelBase {
    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;

    @OneToMany(targetEntity=Ticket.class, mappedBy="order", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Ticket> tickets;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<Ticket> getTickets() {
        if(tickets==null)
            return new ArrayList<>();

        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    private boolean ordered;

    public boolean isOrdered() {
        return ordered;
    }

    public void setOrdered(boolean ordered) {
        this.ordered = ordered;
    }
}
