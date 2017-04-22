package com.columbustheater.controllers;

import com.columbustheater.data.Application;
import com.columbustheater.data.DataContext;
import com.columbustheater.data.DataContextFactory;
import com.columbustheater.models.Account;
import com.columbustheater.viewmodels.Login;
import com.columbustheater.viewmodels.Response;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class AuthController extends ControllerBase {

    @RequestMapping(path="/authenticate")
    @ResponseBody
    public Response<String> authenticate(@RequestBody Login login) {
        DataContext context = getDataContext();
        EntityManager em = context.getEntityManager();
        CriteriaBuilder builder = context.getCriteriaBuilder();

        CriteriaQuery<Account> accountCriteriaQuery = builder.createQuery(Account.class);
        Root<Account> root = accountCriteriaQuery.from(Account.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(builder.equal(root.get("username"), login.getUsername()));
        predicates.add(builder.equal(root.get("password"), login.getPassword()));

        accountCriteriaQuery.select(root).where(predicates.toArray(new Predicate[]{}));

        try {
            Account result = em.createQuery( accountCriteriaQuery ).getSingleResult();

            Date oneDayFromNow = java.sql.Date.valueOf(LocalDate.now().plusDays(1));
            String token =
                    Jwts.builder()
                            .setSubject(String.valueOf(result.getId()))
                            .setExpiration(oneDayFromNow)
                            .signWith(SignatureAlgorithm.HS256, key)
                            .compact();

            return new Response<>(token);

        } catch(NoResultException ex) {
            return new Response<>(null);
        }
    }
}