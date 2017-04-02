package com.columbustheater.data;

import com.columbustheater.models.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import javax.persistence.EntityManager;

/**
 * Created by Phillip on 4/2/2017.
 */
public class DataContextFactory {
    public DataContext createDataContext() {
        Configuration cfg = createConfiguration();
        SessionFactory sessions = cfg.buildSessionFactory();
        EntityManager entityManager = sessions.createEntityManager();

        Session session = sessions.openSession();
        DataContext context = new DataContext(session, entityManager);

        return context;
    }

    private Configuration createConfiguration() {
        return new Configuration()
                .setProperty("hibernate.bytecode.use_reflection_optimizer", "false")
                .setProperty("hibernate.connection.driver_class", "com.mysql.jdbc.Driver")
                .setProperty("hibernate.connection.username", "root")
                .setProperty("hibernate.connection.password", System.getenv("JHU_ROOT_PWD"))
                .setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/GrantHillPizza?autoReconnect=true")
                .setProperty("show_sql", "true")
                .setProperty("hibernate.hbm2ddl.auto", "create")
                .setProperty("hibernate.c3p0.timeout", "600")
                .setProperty("hibernate.c3p0.maxIdleTimeExcessConnections", "20")
                .setProperty("hibernate.c3p0.validate", "false")
                .setProperty("hibernate.c3p0.idle_test_period", "30")
                .setProperty("hibernate.c3p0.automaticTestTable", "conTestTable")
                .setProperty("dialect", "org.hibernate.dialect.MySQLDialect")
                .setProperty("current_session_context_class", "thread")
                .setProperty("cache.provider_class", "org.hibernate.cache.NoCacheProvider")
                .addAnnotatedClass(Account.class)
                .addAnnotatedClass(Section.class)
                .addAnnotatedClass(Seat.class)
                .addAnnotatedClass(Event.class)
                .addAnnotatedClass(Order.class)
                .addAnnotatedClass(Ticket.class);
    }
}