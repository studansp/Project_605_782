package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Account;
import com.columbustheater.models.Order;
import com.columbustheater.models.Ticket;
import com.columbustheater.viewmodels.CartItemRequest;
import com.columbustheater.viewmodels.OrderModel;
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

        DataContext context = getDataContext();
        Session session = context.getSession();

        if(session.getTransaction().isActive())
            session.getTransaction().rollback();

        session.getTransaction().begin();

        if(request.isOrderByQuantity()) {
            String sql = "select seat.row, seat.sectionId from tickets ticket inner join seats seat " +
                    "on ticket.seatId=seat.id where ticket.eventId="+request.getEventId()+" and orderId is null" +
                    " group by seat.row,seat.sectionId having count(*)>="+request.getQuantity()+" LIMIT 1";
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
        } else {
            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getCriteriaBuilder();

            CriteriaQuery<Ticket> ticketCriteriaQuery = builder.createQuery(Ticket.class);
            Root<Ticket> root = ticketCriteriaQuery.from(Ticket.class);
            Predicate[] orPredicates = new Predicate[request.getTickets().length];

            List<Predicate> predicates = new ArrayList<>();

            for (int i=0;i<request.getTickets().length;i++) {
                orPredicates[i] = builder.equal(root.get("id"), request.getTickets()[i].getId());
            }

            predicates.add(builder.or(orPredicates));

            ticketCriteriaQuery.select(root).where(predicates.toArray(new Predicate[]{}));
            List<Ticket> ticketResult = em.createQuery(ticketCriteriaQuery).getResultList();
            em.refresh(order);

            for (Ticket ticket : ticketResult) {
                if (ticket.getOrder() != null) {
                    result.setMessage("The tickets you requested are no longer available");

                    session.getTransaction().rollback();
                    session.close();
                    return result;
                }

                ticket.setOrder(order);
            }

            for (Ticket ticket : ticketResult) {
                session.save(ticket);
            }

            result.setModel(true);
        }

        session.getTransaction().commit();
        session.close();

        return result;
    }

    @RequestMapping(path=path, method = RequestMethod.DELETE)
    @ResponseBody
    public Response<Boolean> delete(@RequestParam(value="id") int id, @RequestHeader(value=AuthHeader) String authHeader) {
        Order order = getOrder(authHeader);
        Response<Boolean> response = new Response<Boolean>();

        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();

        try{
            for (Ticket ticket :
                    order.getTickets()) {
                if (ticket.getId() == id) {
                    if(em.getTransaction().isActive()==false)
                        em.getTransaction().begin();
                    ticket = em.find(Ticket.class, ticket.getId());
                    ticket.setOrder(null);

                    em.getTransaction().commit();
                    response.setModel(true);
                    return response;
                }
            }
        } finally {
            closeIfOpen(context);
        }


        response.setMessage("Unable to delete ticket");

        return response;
    }
}
