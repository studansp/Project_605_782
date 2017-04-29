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
public class EventsController extends ControllerBase {

    @RequestMapping(path="/api/events", method = RequestMethod.GET)
    @ResponseBody
    public Response<List<Event>> get() {
        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();
        CriteriaBuilder builder = context.getCriteriaBuilder();

        CriteriaQuery<Event> eventCriteriaQuery = builder.createQuery(Event.class);
        Root<Event> root = eventCriteriaQuery.from(Event.class);

        eventCriteriaQuery.select(root);
        List<Event> result = em.createQuery( eventCriteriaQuery ).getResultList();

        return new Response<>(result);
    }
}