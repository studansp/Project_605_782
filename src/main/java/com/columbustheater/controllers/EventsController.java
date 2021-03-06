package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Event;
import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Collections;
import java.util.List;

@RestController
public class EventsController extends ControllerBase {

    @RequestMapping(path="/api/events", method = RequestMethod.GET)
    @ResponseBody
    public Response<List<Event>> get() {
        DataContext context = getDataContext();
        List<Event> result=null;
        try {

            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getCriteriaBuilder();

            CriteriaQuery<Event> eventCriteriaQuery = builder.createQuery(Event.class);
            Root<Event> root = eventCriteriaQuery.from(Event.class);

            eventCriteriaQuery.select(root);
            result = em.createQuery( eventCriteriaQuery ).getResultList();

            Collections.sort(result, (a, b) -> b.getDate().compareTo(a.getDate()));
            Collections.reverse(result);

        } finally {
            closeIfOpen(context);
        }

        return new Response<>(result);
    }
}