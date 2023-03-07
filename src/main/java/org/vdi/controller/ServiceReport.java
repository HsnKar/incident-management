package org.vdi.controller;

import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import org.vdi.model.Service;

import javax.ws.rs.Path;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        o.put("servicesCount", servicesCount);
        o.put("serviceList", serviceList);
        o.put("numberOfWeek", numWeek);
        rx.response().end(reportingService.data(o).render());
    }
}
