package com.columbustheater.controllers;

import com.columbustheater.data.DataContext;
import com.columbustheater.models.Section;
import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

@RestController
public class SectionsController extends ControllerBase {
    @RequestMapping(path="/api/sections", method = RequestMethod.GET)
    @ResponseBody
    public Response<Section[]> get() {
        DataContext context = getDataContext();
        List<Section> accounts=null;
        try {

            EntityManager em = context.getEntityManager();
            CriteriaBuilder builder = context.getSession().getCriteriaBuilder();
            CriteriaQuery<Section> accountCriteriaQuery = builder.createQuery(Section.class);

            accountCriteriaQuery.select(accountCriteriaQuery.from(Section.class));

            accounts = em.createQuery( accountCriteriaQuery ).getResultList();

        } finally {
            closeIfOpen(context);
        }


        return new Response<>(accounts.toArray(new Section[accounts.size()]));
    }
}
