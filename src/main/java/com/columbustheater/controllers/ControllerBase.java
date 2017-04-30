package com.columbustheater.controllers;

import com.columbustheater.data.Application;
import com.columbustheater.data.DataContext;
import com.columbustheater.data.DataContextFactory;
import com.columbustheater.models.Account;
import com.columbustheater.models.Event;
import com.columbustheater.models.Order;
import com.columbustheater.models.Ticket;
import com.columbustheater.viewmodels.OrderLineModel;
import com.columbustheater.viewmodels.OrderModel;
import com.columbustheater.viewmodels.TicketModel;
import io.jsonwebtoken.Jwts;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ControllerBase {
    protected final String NotAuthorizedMessage = "You are not authorized to perform that action. Please login and try again.";

    protected final String AuthHeader = "Authorization";
    protected final String key = "OwLMkSWJnKeaDaO_l7MOLCdIAA0km2gbM_YwSMGoaOlx-jcDsfUylj6tiRDHgp5qNnQWlHm6CblMFHN2YGfdZWrXzHV90VJgpSbQ6GyKZY01RTaRTEcYx5H_7eTXYMTC4AjH8I9LXE-Gv9Sfz3I9KHp5QruXw6f0jfHr4T0lE_olb79ujL6X8ycrild-N-lgOJ-nfiPxz9uIuI1BaU_i1gJO1FjTjwoDIqdM8dTeroU-rnT1rOVBA1-my-dIu-sMyr2uBJLq73GKbKse2Y5tLZkexegnGH0GrRcZwCpBM1zkPQ-0mxWG32m4KoDmI3hHkiH7fba83raxH7DM0bnDjQ";

    protected DataContext getDataContext() {

        DataContextFactory factory = Application.getFactory();
        return factory.createDataContext();
    }

    protected Integer getAccountId(String authHeader) {
        try {
            String test = Jwts.parser().setSigningKey(key).parseClaimsJws(authHeader).getBody().getSubject();
            return Integer.parseInt(test);
        } catch(Exception ex) {
            return null;
        }
    }

    protected void closeIfOpen(DataContext context) {
        if(context!=null) {
            Session session = context.getSession();

            if(session!=null) {
                Transaction transaction = session.getTransaction();
                if(transaction.isActive())
                    transaction.rollback();

                if(session.isOpen()) {
                    session.close();
                }
            }

            EntityManager em = context.getEntityManager();

            if(em!=null && em.isOpen()) {
                em.close();
            }
        }
    }

    protected Account getAccount(String authHeader) {
        DataContext context=null;

        try{
            Integer id = getAccountId(authHeader);
            context = getDataContext();
            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getCriteriaBuilder();

            CriteriaQuery<Account> accountCriteriaQuery = builder.createQuery(Account.class);
            Root<Account> root = accountCriteriaQuery.from(Account.class);

            accountCriteriaQuery.where(builder.equal(root.get("id"), id));
            accountCriteriaQuery.select(root);
            return em.createQuery( accountCriteriaQuery ).getSingleResult();

        } catch (Exception ex) {
            //TODO Log or something
            return null;
        } finally {
            closeIfOpen(context);
        }
    }

    protected Order getOrder(String authHeader) {
        //TODO Ticket.Seat information not loading
        Order result;

        Account account = getAccount(authHeader);

        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();
        CriteriaBuilder builder = context.getCriteriaBuilder();

        CriteriaQuery<Order> orderCriteriaQuery = builder.createQuery(Order.class);
        Root<Order> root = orderCriteriaQuery.from(Order.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(builder.equal(root.get("account"), account));
        predicates.add(builder.equal(root.get("ordered"), false));

        orderCriteriaQuery.select(root).where(predicates.toArray(new Predicate[]{}));

        try {
            result = em.createQuery( orderCriteriaQuery ).getSingleResult();
            em.refresh(result);
        } catch(NoResultException ex) {
            result = new Order();
            result.setAccount(account);

            try{
                em.getTransaction().begin();
                em.persist(result);
                em.getTransaction().commit();
            } catch(Exception ex2) {
                if(em.getTransaction().isActive())
                    em.getTransaction().rollback();
            }

        } finally {
            closeIfOpen(context);
        }

        return result;
    }

    protected OrderModel mapOrderToOrderModel(Order order) {
        OrderModel model = new OrderModel();

        Map<Event,List<TicketModel>> eventMap = new HashMap<>();

        for (Ticket ticket : order.getTickets()) {
            TicketModel ticketModel = new TicketModel();
            ticketModel.setId(ticket.getId());
            ticketModel.setSection(ticket.getSeat().getSection().getName());
            ticketModel.setRow(String.valueOf(ticket.getSeat().getRow()));
            ticketModel.setSeat(String.valueOf(ticket.getSeat().getSeat()));
            ticketModel.setCost(ticket.getCost());

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

        return model;
    }

}