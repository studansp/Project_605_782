package com.columbustheater.data;
import com.columbustheater.controllers.AuthController;
import com.columbustheater.models.*;
import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.math.BigDecimal;
import java.util.Currency;
import java.util.GregorianCalendar;
import java.util.List;

@SpringBootApplication
@ComponentScan(basePackageClasses = AuthController.class)
public class Application extends SpringBootServletInitializer {

    private static DataContextFactory factory;

    public static DataContextFactory getFactory() {
        return factory;
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return configureApplication(builder);
    }

    public static void main(String[] args) {
        configureApplication(new SpringApplicationBuilder()).run(args);
    }

    private static void setupHibernate() {
        try {
            factory = new DataContextFactory();
            DataContext context = factory.createDataContext();
            seed(context);
        } catch (Exception ex) {
            System.out.println(ex);
            throw ex;
        }
    }

    private static void seed(DataContext context) {
        EntityManager em = context.getEntityManager();
        CriteriaBuilder builder = context.getSession().getCriteriaBuilder();
        CriteriaQuery<Account> accountCriteriaQuery = builder.createQuery(Account.class);

        accountCriteriaQuery.select(accountCriteriaQuery.from(Account.class));

        List<Account> accounts = em.createQuery( accountCriteriaQuery ).getResultList();

        if(accounts.isEmpty()) {
            Account account = new Account();
            account.setAddress1("123 Main St");
            account.setEmail("pstudans@gmail.com");
            account.setPassword("password123");
            account.setUsername("studansp");
            account.setName("Phillip Studans");

            em.getTransaction().begin();
            em.persist(account);
            em.getTransaction().commit();
        }

        CriteriaQuery<Section> sectionCriteriaQuery = builder.createQuery(Section.class);
        sectionCriteriaQuery.select(sectionCriteriaQuery.from(Section.class));

        List<Section> sections = em.createQuery(sectionCriteriaQuery).getResultList();

        if(sections.isEmpty()) {
            Section orchestra = new Section();
            orchestra.setName("Orchestra");
            Section mezzanine = new Section();
            mezzanine.setName("Mezzanine");
            Section balcony = new Section();
            balcony.setName("Balcony");

            Section[] newSections = new Section[]{ orchestra, mezzanine, balcony};
            em.getTransaction().begin();

            for(int row=0;row<20;row++) {
                for (int seat=0;seat<20;seat++) {
                    for (Section currentSection : newSections) {
                        Seat newSeat = new Seat();
                        newSeat.setRow(row);
                        newSeat.setSeat(seat);
                        newSeat.setSection(currentSection);
                        em.persist(newSeat);
                    }
                }
            }

            em.persist(orchestra);
            em.persist(mezzanine);
            em.persist(balcony);

            em.getTransaction().commit();
        }

        CriteriaQuery<Event> eventCriteriaQuery = builder.createQuery(Event.class);
        eventCriteriaQuery.select(eventCriteriaQuery.from(Event.class));
        List<Event> events = em.createQuery(eventCriteriaQuery).getResultList();

        CriteriaQuery<Seat> seatsCriteriaQuery = builder.createQuery(Seat.class);
        seatsCriteriaQuery.select(seatsCriteriaQuery.from(Seat.class));
        List<Seat> allSeats = em.createQuery(seatsCriteriaQuery).getResultList();

        if(events.isEmpty()) {
            Event event = new Event();
            event.setName("Brian Ferry");
            event.setDate(new GregorianCalendar(2017, 5, 20, 20, 0).getTime());
            event.setImageurl("http://media.ticketmaster.com/en-us/dam/a/c90/53cd884a-a01d-4498-8804-be67b086bc90_95181_EVENT_DETAIL_PAGE_16_9.jpg");

            em.getTransaction().begin();

            for (Seat eventSeat :
                    allSeats) {
                Ticket eventTicket = new Ticket();
                eventTicket.setEvent(event);
                eventTicket.setSeat(eventSeat);
                BigDecimal cost = new BigDecimal(10);
                eventTicket.setCost(cost);
                em.persist(eventTicket);
            }

            em.persist(event);
            em.getTransaction().commit();
        }

    }

    private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
        setupHibernate();
        return builder.sources(Application.class).bannerMode(Banner.Mode.OFF);
    }
}