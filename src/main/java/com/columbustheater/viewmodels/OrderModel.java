package com.columbustheater.viewmodels;

public class OrderModel {
    private OrderLineModel[] lines;

    public OrderLineModel[] getLines() {
        return lines;
    }

    public void setLines(OrderLineModel[] lines) {
        this.lines = lines;
    }
}
