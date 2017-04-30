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
import java.util.*;

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

            for(int row=1;row<=20;row++) {
                for (int seat=1;seat<=20;seat++) {
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
            Map<Event, BigDecimal> seedEvents = getAllEvents();

            em.getTransaction().begin();

            for (Map.Entry<Event, BigDecimal> event :
                    seedEvents.entrySet()) {

                for (Seat eventSeat :
                        allSeats) {
                    Ticket eventTicket = new Ticket();
                    eventTicket.setEvent(event.getKey());
                    eventTicket.setSeat(eventSeat);
                    BigDecimal cost = event.getValue();
                    eventTicket.setCost(cost);
                    em.persist(eventTicket);
                }

                em.persist(event.getKey());

            }

            em.getTransaction().commit();
        }

        if(context.getSession().isOpen())
            context.getSession().close();
    }

    static Map<Event, BigDecimal> getAllEvents() {
        Map<Event, BigDecimal> events = new HashMap<>();

        Event event = new Event();
        event.setName("The Lion King");
        event.setDate(new GregorianCalendar(2017, 5, 17, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/3/31/BuyiZama_Rafiki_Taiwan.jpg");
        event.setDescription("A remake of the classic broadway play.  Performed by the Columbus Association of Fine Arts.");

        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("The Lion King");
        event.setDate(new GregorianCalendar(2017, 5, 19, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/3/31/BuyiZama_Rafiki_Taiwan.jpg");
        event.setDescription("A remake of the classic broadway play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("Romeo and Juliet");
        event.setDate(new GregorianCalendar(2017, 5, 24, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/6/6a/Rigaud-RomeoJuliet.jpg");
        event.setDescription("Classical Shakespearean play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("Romeo and Juliet");
        event.setDate(new GregorianCalendar(2017, 5, 26, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/6/6a/Rigaud-RomeoJuliet.jpg");
        event.setDescription("Classical Shakespearean play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("Hamlet");
        event.setDate(new GregorianCalendar(2017, 5, 31, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/3/38/John_Gilbert_-_Hamlet_in_the_Presence_of_His_Father%27s_Ghost.JPG");
        event.setDescription("Classical Shakespearean play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));


        event = new Event();
        event.setName("Hamlet");
        event.setDate(new GregorianCalendar(2017, 6, 2, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/3/38/John_Gilbert_-_Hamlet_in_the_Presence_of_His_Father%27s_Ghost.JPG");
        event.setDescription("Classical Shakespearean play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("Book of Mormon");
        event.setDate(new GregorianCalendar(2017, 6, 7, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/e/e5/Mormon-book.jpg");
        event.setDescription("See Matt Stone and Trey Parker's award winning musical.");
        events.put(event, new BigDecimal(60));

        event = new Event();
        event.setName("Book of Mormon");
        event.setDate(new GregorianCalendar(2017, 6, 9, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/e/e5/Mormon-book.jpg");
        event.setDescription("See Matt Stone and Trey Parker's award winning musical.");
        events.put(event, new BigDecimal(60));

        event = new Event();
        event.setName("The Rolling Stones");
        event.setDate(new GregorianCalendar(2017, 6, 14, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/b/b3/Rolling_Stones_22.jpg");
        event.setDescription("They're old.  They're still performing.");
        events.put(event, new BigDecimal(80));

        event = new Event();
        event.setName("The Rolling Stones");
        event.setDate(new GregorianCalendar(2017, 6, 16, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/b/b3/Rolling_Stones_22.jpg");
        event.setDescription("They're old.  They're still performing.");
        events.put(event, new BigDecimal(80));

        event = new Event();
        event.setName("Dave Chappelle");
        event.setDate(new GregorianCalendar(2017, 6, 21, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/7/78/Dave_Chappelle_%28cropped%29.jpg");
        event.setDescription("The famous standup comedian, best known from his Comedy Central series Chappelle's show, is back.");
        events.put(event, new BigDecimal(80));

        event = new Event();
        event.setName("Dave Chappelle");
        event.setDate(new GregorianCalendar(2017, 6, 23, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/7/78/Dave_Chappelle_%28cropped%29.jpg");
        event.setDescription("The famous standup comedian, best known from his Comedy Central series Chappelle's show, is back.");
        events.put(event, new BigDecimal(80));

        event = new Event();
        event.setName("Hamilton");
        event.setDate(new GregorianCalendar(2017, 6, 28, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/9/92/Lin-Manuel_Miranda_in_Hamilton.jpg");
        event.setDescription("Today's most hyped musical.");
        events.put(event, new BigDecimal(100));

        event = new Event();
        event.setName("Hamilton");
        event.setDate(new GregorianCalendar(2017, 6, 30, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/9/92/Lin-Manuel_Miranda_in_Hamilton.jpg");
        event.setDescription("Today's most hyped musical.");
        events.put(event, new BigDecimal(100));

        event = new Event();
        event.setName("Alan Watson");
        event.setDate(new GregorianCalendar(2017, 7, 5, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/c/c9/Alanwatsonmagician.jpg");
        event.setDescription("Alan hsa been called the World's Best Magician. (By me, right now)");
        events.put(event, new BigDecimal(8));

        event = new Event();
        event.setName("Alan Watson");
        event.setDate(new GregorianCalendar(2017, 7, 7, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/c/c9/Alanwatsonmagician.jpg");
        event.setDescription("Alan hsa been called the World's Best Magician. (By me, right now)");
        events.put(event, new BigDecimal(8));

        event = new Event();
        event.setName("Midsummer Night's Dream");
        event.setDate(new GregorianCalendar(2017, 7, 12, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/d/d7/Midsummer_Night%27s_Dream_Henry_Fuseli2.jpg");
        event.setDescription("Classical Shakespearean play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("Midsummer Night's Dream");
        event.setDate(new GregorianCalendar(2017, 7, 14, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/d/d7/Midsummer_Night%27s_Dream_Henry_Fuseli2.jpg");
        event.setDescription("Classical Shakespearean play.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("NerdCon");
        event.setDate(new GregorianCalendar(2017, 7, 19, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/2/24/Cosplay_2_1_604804.jpg");
        event.setDescription("Nerds come to trade comics, play Minecraft and stuff.");
        events.put(event, new BigDecimal(120));

        event = new Event();
        event.setName("NerdCon");
        event.setDate(new GregorianCalendar(2017, 7, 21, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/2/24/Cosplay_2_1_604804.jpg");
        event.setDescription("Nerds come to trade comics, play Minecraft and stuff.");
        events.put(event, new BigDecimal(120));

        event = new Event();
        event.setName("Ghasiram Kotwal");
        event.setDate(new GregorianCalendar(2017, 7, 26, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/f/f2/Ghashiram_Kotwal_play_%284%29.JPG");
        event.setDescription("Famous Indian musical.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        event = new Event();
        event.setName("Ghasiram Kotwal");
        event.setDate(new GregorianCalendar(2017, 7, 28, 20, 0).getTime());
        event.setImageurl("https://upload.wikimedia.org/wikipedia/commons/f/f2/Ghashiram_Kotwal_play_%284%29.JPG");
        event.setDescription("Famous Indian musical.  Performed by the Columbus Association of Fine Arts.");
        events.put(event, new BigDecimal(10));

        return events;
    }


    private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
        setupHibernate();
        return builder.sources(Application.class).bannerMode(Banner.Mode.OFF);
    }
}