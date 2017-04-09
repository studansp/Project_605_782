package com.columbustheater.data;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;

/**
 * Created by Phillip on 4/2/2017.
 */
public class DataContext {
    private Session session;
    private EntityManager entityManager;

    public DataContext(Session session, EntityManager entityManager) {
        this.session = session;
        this.entityManager = entityManager;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public CriteriaBuilder getCriteriaBuilder() {
        return session.getCriteriaBuilder();
    }
}
