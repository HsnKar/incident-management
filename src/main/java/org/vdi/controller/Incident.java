package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateException;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import org.vdi.model.Site;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
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
        List<Site> sites = Site.listAll();
        return addIncident.data("sites", sites);
    }

    /*@Blocking
    @Transactional
    @Route(methods = Route.HttpMethod.POST, path = "/postincident")
    public void createIncident(RoutingExchange routingExchange) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Site site = Site.findById(incident.site.id);
        incident.setCause(routingExchange.request().getFormAttribute("cause"));
        incident.setService(routingExchange.request().getFormAttribute("service"));
        incident.setDuration(ChronoUnit.SECONDS.between(LocalDateTime.parse(routingExchange.request().getFormAttribute("start-date")), LocalDateTime.parse(routingExchange.request().getFormAttribute("end-date"))));
        incident.setStartDate(LocalDateTime.parse(routingExchange.request().getFormAttribute("start-date")));
        incident.setEndDate(LocalDateTime.parse(routingExchange.request().getFormAttribute("end-date")));
        incident.setResolution(routingExchange.request().getFormAttribute("resolution"));
        incident.setSite(routingExchange.request().getFormAttribute("site"));
        incident.persist();

        routingExchange.response().end("inserted");
    }*/

    @POST
    @Transactional
    public TemplateInstance createIncident(@FormParam("cause") String cause, @FormParam("site") Long siteId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Site site = Site.findById(siteId);
        if (site == null) {
//            return Response.status(Response.Status.BAD_REQUEST).build()
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCause(cause);
        incident.site = site;
        incident.persist();
//        return Response.status(Response.Status.CREATED).entity(incident).build();
        return get();
    }



}
