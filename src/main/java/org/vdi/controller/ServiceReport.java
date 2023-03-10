package org.vdi.controller;

import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import org.vdi.model.Incident;
import org.vdi.model.Service;

import javax.ws.rs.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.WeekFields;
import java.util.*;

@Path("/nb")
public class ServiceReport {
    @Location("reportingService")
    Template reportingService;
    @Location("reportingServiceGetByDate")
    Template reportingServiceGetByDate;
    @Location("reportingReseau")
    Template reportingReseau;
    @Location("reportingNetGetByDate")
    Template reportingNetGetByDate;

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


    // show the reporting for services
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
        LocalDate lastWeekStart = LocalDate.now().minusWeeks(1).with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate lastWeekEnd = LocalDate.now().minusWeeks(1).with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
        List<Incident> incidents = Incident.list("select i.customId, i.criticality, i.cause, DATE_FORMAT(i.startDate, '%Y-%m-%d %H:%i:%s'), DATE_FORMAT(i.endDate, '%Y-%m-%d %H:%i:%s'), i.duration, i.resolution, s.name, i.status, i.rootCause from Incident i join i.service s where i.createdAt BETWEEN ?1 AND ?2", lastWeekStart, lastWeekEnd);
        // Nombre de tickets ouverts
        Long to = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 2L, "EN_COURS", lastWeekStart, lastWeekEnd);
        // Nombre de tickets fermés
        Long tf = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 2L, "TERMINE", lastWeekStart, lastWeekEnd);
        o.put("countServiceO", to);
        o.put("countServicef", tf);
        o.put("lw", lw);
        o.put("incidents", incidents);

//        o.put("servicesCount", servicesCount);
//        o.put("serviceList", serviceList);
//        o.put("numberOfWeek", numWeek);
        rx.response().end(reportingService.data(o).render());
    }

    //    @Blocking
//    @Route(path = "/servreportingbydate", methods = Route.HttpMethod.GET)
//    public void getByDate(RoutingExchange rx) {
//        Map<String, Object> o = new HashMap<>();
//        List<Incident> incidents = Incident.list("select i.customId, i.criticality, i.cause, DATE_FORMAT(i.startDate, '%Y-%m-%d %H:%i:%s'), DATE_FORMAT(i.endDate, '%Y-%m-%d %H:%i:%s'), i.duration, i.resolution, s.name, i.status, i.rootCause from Incident i join i.service s where i.createdAt BETWEEN ?1 AND ?2", rx., lastWeekEnd);
////        o.put("lw", lw);
//        o.put("incidents", incidents);
//        rx.response().end(reportingServiceGetByDate.data(o).render());
//    }
    @GET
    @Path("/servreportingbydate")
    public TemplateInstance getByDate(@QueryParam("from_date") String createdAt, @QueryParam("to_date") String closedAt) {
        LocalDate created = LocalDate.parse(createdAt);
        LocalDate closed = LocalDate.parse(closedAt);
        Map<String, Object> o = new HashMap<>();
        List<Incident> incidents = Incident.list("select i.customId, i.criticality, i.cause, DATE_FORMAT(i.startDate, '%Y-%m-%d %H:%i:%s'), DATE_FORMAT(i.endDate, '%Y-%m-%d %H:%i:%s'), i.duration, i.resolution, s.name, i.status, i.rootCause from Incident i join i.service s where i.createdAt BETWEEN ?1 AND ?2", created, closed);
        // Nombre de tickets ouverts
        Long to = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 2L, "EN_COURS", created, closed);
        // Nombre de tickets fermés
        Long tf = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 2L, "TERMINE", created, closed);
        o.put("countServiceO", to);
        o.put("countServicef", tf);
        o.put("incidents", incidents);
        return reportingServiceGetByDate.data(o);
    }


    // show reporting for network

    @Blocking
    @Route(path = "/netweeklyreporting", methods = Route.HttpMethod.GET)
    public void getWeeklyReportNet(RoutingExchange rx) {
        Map<String, Object> o = new HashMap<>();
        Integer numWeek = numberOfWeek();
        long servicesCount = Service.count();
        List<Service> serviceList = Service.listAll();

        // Getting last week's number
        LocalDate lastweek = LocalDate.now().minusWeeks(1);
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int lw = lastweek.get(weekFields.weekOfWeekBasedYear());
        LocalDate lastWeekStart = LocalDate.now().minusWeeks(1).with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate lastWeekEnd = LocalDate.now().minusWeeks(1).with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
        List<Incident> incidentsite = Incident.list("select i.customId, i.criticality, i.cause, DATE_FORMAT(i.startDate, '%Y-%m-%d %H:%i:%s'), DATE_FORMAT(i.endDate, '%Y-%m-%d %H:%i:%s'), i.duration, i.resolution, n.name, i.status, i.rootCause from Incident i join i.site n where i.createdAt BETWEEN ?1 AND ?2", lastWeekStart, lastWeekEnd);
        // Nombre de tickets ouverts
        Long to = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 1L, "EN_COURS", lastWeekStart, lastWeekEnd);
        // Nombre de tickets fermés
        Long tf = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 1L, "TERMINE", lastWeekStart, lastWeekEnd);
        o.put("countSiteO", to);
        o.put("countSitef", tf);
        o.put("lw", lw);
        o.put("incidents", incidentsite);
        rx.response().end(reportingReseau.data(o).render());
    }

    @GET
    @Path("/netreportingbydate")
    public TemplateInstance getByDateNet(@QueryParam("from_date") String createdAt, @QueryParam("to_date") String closedAt) {
        LocalDate created = LocalDate.parse(createdAt);
        LocalDate closed = LocalDate.parse(closedAt);
        Map<String, Object> o = new HashMap<>();
        List<Incident> incidents = Incident.list("select i.customId, i.criticality, i.cause, DATE_FORMAT(i.startDate, '%Y-%m-%d %H:%i:%s'), DATE_FORMAT(i.endDate, '%Y-%m-%d %H:%i:%s'), i.duration, i.resolution, s.name, i.status, i.rootCause from Incident i join i.site s where i.createdAt BETWEEN ?1 AND ?2", created, closed);
        // Nombre de tickets ouverts
        Long to = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 1L, "EN_COURS", created, closed);
        // Nombre de tickets fermés
        Long tf = Incident.count("type.id = ?1 and status = ?2 and createdAt BETWEEN ?3 AND ?4", 1L, "TERMINE", created, closed);
        o.put("countSiteO", to);
        o.put("countSitef", tf);
        o.put("incidents", incidents);
        return reportingNetGetByDate.data(o);
    }
}
