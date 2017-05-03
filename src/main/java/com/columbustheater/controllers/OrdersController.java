package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Account;
import com.columbustheater.models.Order;
import com.columbustheater.models.Ticket;
import com.columbustheater.viewmodels.OrderModel;
import com.columbustheater.viewmodels.Response;
import com.columbustheater.viewmodels.TicketModel;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@RestController
public class OrdersController extends ControllerBase {

    @RequestMapping(path="/api/orders", method = RequestMethod.GET)
    @ResponseBody
    public Response<OrderModel[]> get(@RequestHeader(value=AuthHeader) String authHeader) {
        Account account = getAccount(authHeader);
        DataContext context = getDataContext();

        try {
            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getCriteriaBuilder();

            CriteriaQuery<Order> orderCriteriaQuery = builder.createQuery(Order.class);
            Root<Order> root = orderCriteriaQuery.from(Order.class);
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(builder.equal(root.join("account").get("id"), account.getId()));

            orderCriteriaQuery.select(root).where(predicates.toArray(new Predicate[]{}));
            List<Order> result = em.createQuery(orderCriteriaQuery).getResultList();
            OrderModel[] responseModel = new OrderModel[result.size()];

            int i=0;

            for(Order order: result) {
                responseModel[i] = mapOrderToOrderModel(order);
                i++;
            }

            return new Response<>(responseModel);
        } finally {
            closeIfOpen(context);
        }
    }
}
