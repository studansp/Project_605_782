package com.columbustheater.controllers;

import com.columbustheater.models.Event;
import com.columbustheater.models.Order;
import com.columbustheater.models.Ticket;
import com.columbustheater.viewmodels.OrderLineModel;
import com.columbustheater.viewmodels.OrderModel;
import com.columbustheater.viewmodels.Response;
import com.columbustheater.viewmodels.TicketModel;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CartController extends ControllerBase {
    @RequestMapping(path="/api/cart", method = RequestMethod.GET)
    @ResponseBody
    public Response<OrderModel> get(@RequestHeader(value=AuthHeader) String authHeader) {
        OrderModel model = new OrderModel();

        Order order = getOrder(authHeader);

        Map<Event,List<TicketModel>> eventMap = new HashMap<>();

        for (Ticket ticket : order.getTickets()) {
            TicketModel ticketModel = new TicketModel();
            ticketModel.setId(ticket.getId());
            ticketModel.setSection(ticket.getSeat().getSection().getName());
            ticketModel.setRow(String.valueOf(ticket.getSeat().getRow()));
            ticketModel.setSeat(String.valueOf(ticket.getSeat().getSeat()));

            if(eventMap.containsKey(ticket.getEvent())) {
                eventMap.get(ticket.getEvent()).add(ticketModel);
            } else {
                List<TicketModel> eventList = new ArrayList<>();
                eventList.add(ticketModel);

                eventMap.put(ticket.getEvent(), eventList);
            }
        }

        OrderLineModel[] lines = new OrderLineModel[eventMap.keySet().size()];
        int i=0;

        for (Event key:
             eventMap.keySet()) {
            OrderLineModel orderLineModel = new OrderLineModel();
            orderLineModel.setEvent(key);
            orderLineModel.setTickets(eventMap.get(key));
            lines[i]=orderLineModel;
            i++;
        }


        model.setLines(lines);
        return new Response<>(model);
    }
}