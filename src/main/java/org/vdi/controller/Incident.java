package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Service;
import org.vdi.model.Site;
import org.vdi.model.Status;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Path("/incidents")
public class Incident {

    @Inject
    Template addIncidentReseau;

    @Inject
    Template addIncidentService;

    @GET
    @Path("/reseau")
    public TemplateInstance getReseauForm() {
        List<Site> sites = Site.listAll();
        return addIncidentReseau.data("sites", sites);
    }

    @GET
    @Path("/service")
    public TemplateInstance getServiceForm() {
        List<Service> services = Service.listAll();
        return addIncidentService.data("services", services);
    }
    @POST
    @Path("/reseau")
    @Transactional
    public TemplateInstance createIncidentReseau(@FormParam("cause") String cause, @FormParam("status") String status,@FormParam("resolution") String resolution,@FormParam("start-date")String date_deb, @FormParam("end-date")String end_date, @FormParam("site") Long siteId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Site site = Site.findById(siteId);
        if (site == null) {
//            return Response.status(Response.Status.BAD_REQUEST).build()
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        incident.setEndDate(LocalDateTime.parse(end_date));
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(Status.valueOf(status));
        incident.site = site;
        incident.persist();
//        return Response.status(Response.Status.CREATED).entity(incident).build();
        return getReseauForm();
    }

    @POST
    @Path("/service")
    @Transactional
    public TemplateInstance createIncidentService(@FormParam("cause") String cause, @FormParam("status") String status,@FormParam("resolution") String resolution,@FormParam("start-date")String date_deb, @FormParam("end-date")String end_date, @FormParam("site") Long serviceId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Service service = Service.findById(serviceId);
        if (service == null) {
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        incident.setEndDate(LocalDateTime.parse(end_date));
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(Status.valueOf(status));
        incident.service = service;
        incident.persist();
        return getServiceForm();
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
}
