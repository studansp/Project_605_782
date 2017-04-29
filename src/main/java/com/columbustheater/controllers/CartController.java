package com.columbustheater.controllers;

import com.columbustheater.models.Order;
import com.columbustheater.viewmodels.OrderModel;
import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController extends ControllerBase {
    @RequestMapping(path="/api/cart", method = RequestMethod.GET)
    @ResponseBody
    public Response<OrderModel> get(@RequestHeader(value=AuthHeader) String authHeader) {
        Order order = getOrder(authHeader);

        OrderModel model = mapOrderToOrderModel(order);
        return new Response<>(model);
    }
}