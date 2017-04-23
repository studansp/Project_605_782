package com.columbustheater.controllers;

import com.columbustheater.data.Application;
import com.columbustheater.data.DataContext;
import com.columbustheater.data.DataContextFactory;
import com.columbustheater.models.Account;
import com.columbustheater.models.Order;
import io.jsonwebtoken.Jwts;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ControllerBase {
    protected final String NotAuthorizedMessage = "You are not authorized to perform that action. Please login and try again.";

    protected final String AuthHeader = "Authorization";
    protected final String key = "OwLMkSWJnKeaDaO_l7MOLCdIAA0km2gbM_YwSMGoaOlx-jcDsfUylj6tiRDHgp5qNnQWlHm6CblMFHN2YGfdZWrXzHV90VJgpSbQ6GyKZY01RTaRTEcYx5H_7eTXYMTC4AjH8I9LXE-Gv9Sfz3I9KHp5QruXw6f0jfHr4T0lE_olb79ujL6X8ycrild-N-lgOJ-nfiPxz9uIuI1BaU_i1gJO1FjTjwoDIqdM8dTeroU-rnT1rOVBA1-my-dIu-sMyr2uBJLq73GKbKse2Y5tLZkexegnGH0GrRcZwCpBM1zkPQ-0mxWG32m4KoDmI3hHkiH7fba83raxH7DM0bnDjQ";

    private DataContext dataContext;

    protected DataContext getDataContext() {
        return getDataContext(false);
    }

    protected DataContext getDataContext(boolean createNew) {
        if(createNew || dataContext==null) {
            DataContextFactory factory = Application.getFactory();
            dataContext = factory.createDataContext();
        }

        return dataContext;
    }

    protected Integer getAccountId(String authHeader) {
        try {
            String test = Jwts.parser().setSigningKey(key).parseClaimsJws(authHeader).getBody().getSubject();
            return Integer.parseInt(test);
        } catch(Exception ex) {
            return null;
        }
    }

    protected Account getAccount(String authHeader) {
        try{
            Integer id = getAccountId(authHeader);
            DataContext context = getDataContext();
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
        }
    }

    protected Order getOrder(String authHeader) {
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

        } catch(NoResultException ex) {
            result = new Order();
            result.setAccount(account);

            em.getTransaction().begin();
            em.persist(result);
            em.getTransaction().commit();
        }

        return result;
    }

}