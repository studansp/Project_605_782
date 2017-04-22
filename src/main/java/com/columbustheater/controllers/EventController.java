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
    @RequestMapping(path="/event", method = RequestMethod.GET)
    @ResponseBody
    public Response<Event> get(@RequestParam(value="id") int id) {
        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();
        CriteriaBuilder builder = context.getCriteriaBuilder();

        CriteriaQuery<Event> eventCriteriaQuery = builder.createQuery(Event.class);
        Root<Event> root = eventCriteriaQuery.from(Event.class);
        eventCriteriaQuery.where(builder.equal(root.get("id"), id));
        eventCriteriaQuery.select(root);
        Event result = em.createQuery( eventCriteriaQuery ).getSingleResult();

        return new Response<>(result);
    }
}
