package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Account;
import com.columbustheater.viewmodels.Response;
import org.hibernate.Transaction;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

@RestController
public class AccountController extends ControllerBase {
    private static final String path="/api/account";

    @RequestMapping(path=path, method = RequestMethod.POST)
    @ResponseBody
    public Response<Account> create(@RequestBody Account account) {
        //TODO Figure out validation
        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();

        try {
            em.getTransaction().begin();
            em.persist(account);
            em.getTransaction().commit();

        } catch (Exception ex) {
            EntityTransaction tran = em.getTransaction();
            if(tran.isActive())
                tran.rollback();
        }

        return new Response<>(account);
    }

    @RequestMapping(path=path, method = RequestMethod.PUT)
    @ResponseBody
    public Response<Account> update(@RequestHeader(value=AuthHeader) String authHeader, @RequestBody Account account) {
        Account currentAccount = getAccount(authHeader);

        if(currentAccount==null || currentAccount.getId()!=account.getId()) {
            Response result = new Response<Account>();
            result.setMessage(NotAuthorizedMessage);
            return result;
        }

        currentAccount.setEmail(account.getEmail());
        currentAccount.setAddress1(account.getAddress1());
        currentAccount.setAddress2(account.getAddress2());
        currentAccount.setName(account.getName());

        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();

        try {

            if(em.getTransaction().isActive()==false)
                em.getTransaction().begin();

            context.getSession().save(currentAccount);
            em.getTransaction().commit();
        } catch(Exception ex) {
            if(em.getTransaction().isActive())
                em.getTransaction().rollback();
        }

        return new Response<>(currentAccount);
    }

    @RequestMapping(path=path, method = RequestMethod.GET)
    @ResponseBody
    public Response<Account> get(@RequestHeader(value=AuthHeader) String authHeader) {
        return new Response<>(getAccount(authHeader));
    }
}