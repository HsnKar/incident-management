package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Path("/incidents")
public class Incident {

    @Inject
    Template addIncident;

    @GET
    public TemplateInstance get() {
        List<Incident> incidents = new ArrayList<>();
        return addIncident.data("incidents", incidents);
    }

    @Blocking
    @Transactional
    @Route(methods = Route.HttpMethod.POST, path = "/post")
    public void createIncident(RoutingExchange routingExchange) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        incident.setCause(routingExchange.request().getFormAttribute("cause"));
        incident.setService(routingExchange.request().getFormAttribute("service"));
        incident.setDuration(ChronoUnit.SECONDS.between(LocalDateTime.parse(routingExchange.request().getFormAttribute("start-date")), LocalDateTime.parse(routingExchange.request().getFormAttribute("end-date"))));
        incident.setStartDate(LocalDateTime.parse(routingExchange.request().getFormAttribute("start-date")));
        incident.setEndDate(LocalDateTime.parse(routingExchange.request().getFormAttribute("end-date")));
        incident.setResolution(routingExchange.request().getFormAttribute("resolution"));
        incident.setSite(routingExchange.request().getFormAttribute("site"));
        incident.persist();

        routingExchange.response().end("inserted");
    }

    @Blocking
    @Transactional
    @Route(methods = Route.HttpMethod.GET, path = "/update")
    public void updateIncident(RoutingExchange routingExchange) {
        org.vdi.model.Incident.update("cause = ?1, site = ?2, start_date = ?4 where id = ?3", "bbbb", "cccc", (long) 1, LocalDateTime.now());

        routingExchange.response().end("updated");
    }

}
