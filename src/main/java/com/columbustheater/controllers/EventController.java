package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
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
    @RequestMapping(path="/api/event", method = RequestMethod.GET)
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
}
