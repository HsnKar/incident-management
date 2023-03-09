package org.vdi.controller;

import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import org.vdi.model.Incident;
import org.vdi.model.Service;

import javax.ws.rs.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.*;

import static io.quarkus.hibernate.orm.panache.PanacheEntityBase.list;

@Path("/nb")
public class ServiceReport {
    @Location("reportingService")
    Template reportingService;

    // Calculating the number of weeks in a year
    public int numberOfWeek() {
        Calendar cal = Calendar.getInstance();
        int year = LocalDateTime.now().getYear();
        cal.set(Calendar.YEAR, year);
        int numWeeks = cal.getActualMaximum(Calendar.WEEK_OF_YEAR);
//        LocalDateTime today = LocalDateTime.now();
//        int year = today.getYear();
//        LocalDate firstDayOfYear = LocalDate.of(year, 1,1);
//        long daySinceFirstDayOfYear = ChronoUnit.DAYS.between( firstDayOfYear, today );
//        int numberOfWeeks = (int) Math.ceil(daySinceFirstDayOfYear / 7.0);
        return numWeeks;
    }


    // show the reporting
    @Blocking
    @Route(path = "/servweeklyreporting", methods = Route.HttpMethod.GET)
    public void getWeeklyReport(RoutingExchange rx) {
        Map<String, Object> o = new HashMap<>();
        Integer numWeek = numberOfWeek();
        long servicesCount = Service.count();
        List<Service> serviceList = Service.listAll();

        // Getting last week's number
        LocalDate lastweek = LocalDate.now().minusWeeks(1);
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int lw = lastweek.get(weekFields.weekOfWeekBasedYear());
        LocalDateTime lastWeekStart = LocalDateTime.now().minusWeeks(1).with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDateTime lastWeekEnd = LocalDateTime.now().minusWeeks(1).with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));

        List<Incident> incidents = Incident.list("select i.customId, i.criticality, i.cause, DATE_FORMAT(i.startDate, '%Y-%m-%d %H:%i:%s'), DATE_FORMAT(i.endDate, '%Y-%m-%d %H:%i:%s'), i.duration, i.resolution, s.name, i.status, i.rootCause from Incident i join i.service s where i.createdAt BETWEEN ?1 AND ?2", lastWeekStart, lastWeekEnd);
        o.put("lw", lw);
        o.put("incidents", incidents);

//        o.put("servicesCount", servicesCount);
//        o.put("serviceList", serviceList);
//        o.put("numberOfWeek", numWeek);
        rx.response().end(reportingService.data(o).render());
    }
}
