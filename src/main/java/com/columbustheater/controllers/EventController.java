package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Account;
import com.columbustheater.models.Event;
import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@RestController
public class EventController extends ControllerBase {
    private static final String path="/api/event";

    @RequestMapping(path=path, method = RequestMethod.GET)
    @ResponseBody
    public Response<Event> get(@RequestParam(value="id") int id) {
        DataContext context = getDataContext();
        Event result=null;
        try {
            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getCriteriaBuilder();

            CriteriaQuery<Event> eventCriteriaQuery = builder.createQuery(Event.class);
            Root<Event> root = eventCriteriaQuery.from(Event.class);
            eventCriteriaQuery.where(builder.equal(root.get("id"), id));
            eventCriteriaQuery.select(root);
            result = em.createQuery( eventCriteriaQuery ).getSingleResult();
        } finally {
            closeIfOpen(context);
        }

        return new Response<>(result);
    }


    @RequestMapping(path=path, method = RequestMethod.PUT)
    @ResponseBody
    public Response<Event> update(@RequestHeader(value=AuthHeader) String authHeader, @RequestBody Event event) {

        Account currentAccount = getAccount(authHeader);

        if(currentAccount==null || currentAccount.isAdmin()==false) {
            Response result = new Response<Account>();
            result.setMessage(NotAuthorizedMessage);
            return result;
        }


        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();
        Event dbEvent=null;

        try {
            if(em.getTransaction().isActive()==false)
                em.getTransaction().begin();

            dbEvent = em.find(Event.class, currentAccount.getId());

            dbEvent.setDescription(event.getDescription());
            dbEvent.setName(event.getName());
            dbEvent.setDate(event.getDate());
            dbEvent.setImageurl(event.getImageurl());

            em.getTransaction().commit();
        } catch(Exception ex) {
            if(em.getTransaction().isActive())
                em.getTransaction().rollback();
        }
        finally {
            closeIfOpen(context);
        }

        return new Response<>(dbEvent);
    }
}
