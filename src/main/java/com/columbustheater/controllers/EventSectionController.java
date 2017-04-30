package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Order;
import com.columbustheater.models.Ticket;
import com.columbustheater.viewmodels.Response;
import com.columbustheater.viewmodels.TicketModel;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@RestController
public class EventSectionController extends ControllerBase {
    @RequestMapping(path="/api/eventsection", method = RequestMethod.GET)
    @ResponseBody
    public Response<TicketModel[]> get(@RequestParam(value="id") int id, @RequestParam(value="eventId") int eventId) {
        DataContext context = getDataContext();
        TicketModel[] responseModel=null;

        try {

            context.getSession().clear();
            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getCriteriaBuilder();

            CriteriaQuery<Ticket> ticketCriteriaQuery = builder.createQuery(Ticket.class);
            Root<Ticket> root = ticketCriteriaQuery.from(Ticket.class);
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(builder.equal(root.join("event").get("id"), eventId));
            predicates.add(builder.equal(root.join("seat").join("section").get("id"), id));

            ticketCriteriaQuery.select(root).where(predicates.toArray(new Predicate[]{}));

            List<Ticket> result = em.createQuery(ticketCriteriaQuery).getResultList();
            responseModel = new TicketModel[result.size()];

            int i=0;

            for (Ticket ticket :
                    result) {
                TicketModel model = new TicketModel();
                model.setId(ticket.getId());
                model.setSection(ticket.getSeat().getSection().getName());
                model.setRow(String.valueOf(ticket.getSeat().getRow()));
                model.setSeat(String.valueOf(ticket.getSeat().getSeat()));
                model.setCost(ticket.getCost());
                model.setAvailable(ticket.getOrder()==null);

                responseModel[i]=model;

                i++;
            }
        } finally {
            closeIfOpen(context);
        }

        return new Response<>(responseModel);
    }
}