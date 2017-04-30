package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Order;
import com.columbustheater.viewmodels.OrderModel;
import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;

@RestController
public class OrderController extends ControllerBase {
    private static final String path = "/api/order";

    @RequestMapping(path=path, method = RequestMethod.POST)
    @ResponseBody
    public Response<OrderModel> create(@RequestHeader(value=AuthHeader) String authHeader) {
        DataContext context = getDataContext();
        Order order = null;

        try {
            EntityManager em = context.getEntityManager();

            em.getTransaction().begin();
            order = getOrder(authHeader);

            order = em.find(Order.class, order.getId());

            order.setOrdered(true);
            em.getTransaction().commit();

        } finally {
            closeIfOpen(context);
        }
        return new Response<>(mapOrderToOrderModel(order));
    }

    @RequestMapping(path=path, method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get(@RequestParam(value="id") int id) {
        return null;
    }
}
