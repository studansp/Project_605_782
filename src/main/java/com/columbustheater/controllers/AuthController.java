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
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.Date;

@RestController
public class AuthController {
    private final String issuer = "http://trustyapp.com/";
    private final String key = "OwLMkSWJnKeaDaO_l7MOLCdIAA0km2gbM_YwSMGoaOlx-jcDsfUylj6tiRDHgp5qNnQWlHm6CblMFHN2YGfdZWrXzHV90VJgpSbQ6GyKZY01RTaRTEcYx5H_7eTXYMTC4AjH8I9LXE-Gv9Sfz3I9KHp5QruXw6f0jfHr4T0lE_olb79ujL6X8ycrild-N-lgOJ-nfiPxz9uIuI1BaU_i1gJO1FjTjwoDIqdM8dTeroU-rnT1rOVBA1-my-dIu-sMyr2uBJLq73GKbKse2Y5tLZkexegnGH0GrRcZwCpBM1zkPQ-0mxWG32m4KoDmI3hHkiH7fba83raxH7DM0bnDjQ";

    @RequestMapping(path="/authenticate")
    @ResponseBody
    public Response<String> authenticate(@RequestBody Login login) {
        DataContextFactory factory = Application.getFactory();
        DataContext context = factory.createDataContext();
        EntityManager em = context.getEntityManager();

        CriteriaBuilder builder = context.getSession().getCriteriaBuilder();
        CriteriaQuery<Account> accountCriteriaQuery = builder.createQuery(Account.class);
        Root<Account> root = accountCriteriaQuery.from(Account.class);

        accountCriteriaQuery.where(builder.equal(root.get("username"), login.getUsername()));
        accountCriteriaQuery.where(builder.equal(root.get("password"), login.getPassword()));

        accountCriteriaQuery.select(root);

        try {
            Account result = em.createQuery( accountCriteriaQuery ).getSingleResult();

            Date oneDayFromNow = java.sql.Date.valueOf(LocalDate.now().plusDays(1));
            String token =
                    Jwts.builder().setIssuer(issuer)
                            .setSubject(String.valueOf(result.getId()))
                            .setExpiration(oneDayFromNow)
                            .signWith(SignatureAlgorithm.HS256, key)
                            .compact();

            String test = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();

            return new Response<>(token);

        } catch(NoResultException ex) {
            return new Response<>(null);
        }
    }
}