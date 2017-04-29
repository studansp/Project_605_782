package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Account;
import com.columbustheater.models.Order;
import com.columbustheater.models.Ticket;
import com.columbustheater.viewmodels.CartItemRequest;
import com.columbustheater.viewmodels.Response;
import org.hibernate.Session;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@RestController
public class CartItemController extends ControllerBase {
    private static final String path = "/api/cartitem";

    @RequestMapping(path=path, method = RequestMethod.POST)
    @ResponseBody
    public Response<Boolean> create(@RequestHeader(value=AuthHeader) String authHeader, @RequestBody CartItemRequest request) {
        Order order = getOrder(authHeader);
        Response<Boolean> result = new Response<>();

        if(request.isOrderByQuantity()) {
            String sql = "select seat.row, seat.sectionId from tickets ticket inner join seats seat " +
                    "on ticket.seatId=seat.id where ticket.eventId="+request.getEventId()+" and orderId is null" +
                    " group by seat.row,seat.sectionId having count(*)>="+request.getQuantity()+" LIMIT 1";

            DataContext context = getDataContext(true);
            Session session = context.getSession();
            session.beginTransaction();
            List validRowResult = session.createSQLQuery(sql).list();

            if(validRowResult.isEmpty()) {
                result.setMessage("The requested quantity is not available.");
            } else {
                Object[] validArray = (Object[])validRowResult.get(0);

                String updateSql = "update tickets ticket set ticket.orderId="+order.getId()+
                        " where ticket.id in (select id from (select ticket2.id from tickets ticket2 " +
                        "inner join seats seat on seat.id=ticket2.seatId and seat.row="+validArray[0]+" and seat.sectionId="+validArray[1]+" where ticket2.orderId is null and ticket2.eventId="+request.getEventId()+" LIMIT "+request.getQuantity()+") sub1 );";

                session.createSQLQuery(updateSql).executeUpdate();
                result.setModel(true);
            }

            session.getTransaction().commit();
            session.close();
        } else{
            //TODO Seat selector
            result = new Response<>();
            result.setMessage("TODO");
        }

        return result;
    }

    @RequestMapping(path=path, method = RequestMethod.DELETE)
    @ResponseBody
    public Response<String> delete(@RequestBody Integer id) {
        return null;
    }
}
