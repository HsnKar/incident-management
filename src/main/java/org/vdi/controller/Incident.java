package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.ReactiveRoutes;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import org.vdi.model.Service;
import org.vdi.model.Site;

import javax.annotation.security.PermitAll;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Path("/incidents")
@PermitAll
public class Incident {
    @Inject
    Validator validator;

    @Inject
    EntityManager entityManager;

    @Inject
    Template addIncidentReseau;

    @Inject
    Template addIncidentService;
    @Inject
    Template footer;

    @Inject
    Template navbar;

    @Inject
    Template listAllIncidents;

    @Inject
    Template updateIncidentReseau;

    @Inject
    Template updateIncidentService;

    @GET
    public TemplateInstance getAllIncidents() {
        List<org.vdi.model.Incident> incidentServices = org.vdi.model.Incident.list(
                "select i.id, " +
                        "i.cause, " +
                        "i.startDate, " +
                        "i.endDate, " +
                        "i.duration, " +
                        "i.resolution, " +
                        "s.name from Incident i join i.service s " +
                        "where i.status = ?1", "EN_COURS");
        List<org.vdi.model.Incident> incidentSites = org.vdi.model.Incident.list(
                "select i.id, " +
                        "i.cause, " +
                        "i.startDate, " +
                        "i.endDate, " +
                        "i.duration, " +
                        "i.resolution, " +
                        "s.name from Incident i join i.site s " +
                        "where i.status = ?1", "EN_COURS");
//        long countIncidentSite = Incident.("select count(i) from Incident i join i.site s where i.status = ?1", "EN_COURS");
        long countIncidentSite = incidentSites.size();
        long countIncidentService = incidentServices.size();
        Map<String, Object> obj = new HashMap<>();
        obj.put("countService", countIncidentService);
        obj.put("countSite",countIncidentSite);
        obj.put("incidentServices", incidentServices);
        obj.put("incidentSites", incidentSites);
        return listAllIncidents.data(obj);
    }

    @GET
    @Path("/reseau")
    public TemplateInstance getReseauForm() {
        List<Site> sites = Site.listAll();
        Map<String, Object> objSites = new HashMap<>();
        objSites.put("sites", sites);
        objSites.put("isUpdate", false);
        return addIncidentReseau.data(objSites);
    }

    @GET
    @Path("/service")
    public TemplateInstance getServiceForm() {
        List<Service> services = Service.listAll();
        Map<String, Object> objSites = new HashMap<>();
        objSites.put("services", services);
        objSites.put("isUpdate", false);
        return addIncidentService.data(objSites);
    }
    @POST
    @Path("/reseau")
    @Transactional
    public TemplateInstance createIncidentReseau(@FormParam("cause") String cause,
                                                 @FormParam("status") String status,
                                                 @FormParam("resolution") String resolution,
                                                 @FormParam("start-date")String date_deb,
                                                 @FormParam("end-date")String end_date,
                                                 @FormParam("site") Long siteId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Site site = Site.findById(siteId);
        if (site == null) {
//            return Response.status(Response.Status.BAD_REQUEST).build()
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        if (end_date != null)
        incident.setEndDate(LocalDateTime.parse(end_date));
        if (date_deb != null && end_date != null)
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(status);
        incident.site = site;
        incident.persist();
//        return Response.status(Response.Status.CREATED).entity(incident).build();
        return getReseauForm();
    }

    @POST
    @Path("/service")
    @Transactional
    public TemplateInstance createIncidentService(@FormParam("cause") String cause,
                                                  @FormParam("status") String status,
                                                  @FormParam("resolution") String resolution,
                                                  @FormParam("start-date")String date_deb,
                                                  @FormParam("end-date")String end_date,
                                                  @FormParam("service") Long serviceId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Service service = Service.findById(serviceId);
        if (service == null) {
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        if (end_date != null)
        incident.setEndDate(LocalDateTime.parse(end_date));
        if (date_deb != null && end_date != null)
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
//        incident.setStatus(Status.valueOf(status));
        incident.setStatus(status);
        incident.service = service;
        incident.persist();
        return getServiceForm();
    }

    @GET
    @Path("/service/{id}")
    public TemplateInstance getServiceFormUpdate(@PathParam("id")long id) {
        Service service = Service.findById(id);
        org.vdi.model.Incident incident = org.vdi.model.Incident.findById(id);
        Map<String, Object> obj = new HashMap<>();
        obj.put("services", service);
        obj.put("incident", incident);
        obj.put("isUpdate", true);
        return updateIncidentService.data(obj);
    }

    @GET
    @Path("/reseau/{id}")
    public TemplateInstance getReseauFormUpdate(@PathParam("id")long id) {
//        org.vdi.model.Incident incidentSite = org.vdi.model.Incident.find("select s.name from incident i join site s");
        org.vdi.model.Incident incident = org.vdi.model.Incident.findById(id);
        Map<String, Object> obj = new HashMap<>();
//        obj.put("site", incidentSite);
        obj.put("incident", incident);
        obj.put("isUpdate", true);
        return updateIncidentReseau.data(obj);
    }

    @PUT
    @Path("/reseau/{id}")
    @Transactional
    public TemplateInstance updateIncidentReseau(@FormParam("cause") String cause,
                                                 @FormParam("status") String status,
                                                 @FormParam("resolution") String resolution,
                                                 @FormParam("start-date")String date_deb,
                                                 @FormParam("end-date")String end_date,
                                                 @FormParam("site") Long siteId) {
//        org.vdi.model.Incident incident = org.vdi.model.Incident.findById(id);
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Site site = Site.findById(siteId);
        if (site == null) {
            throw new NullPointerException("Oh nooo!");
        }
//        incident.id = id;
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        incident.setEndDate(LocalDateTime.parse(end_date));
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(status);
        entityManager.merge(incident);
//        org.vdi.model.Incident.update("end-date = ?1", end_date);
        return getReseauForm();
    }


    @Blocking
    @Transactional
    @Route(path = "reseau/update", methods = Route.HttpMethod.POST)
    public  void updateReseau(RoutingExchange rx) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        org.vdi.model.Incident inc = org.vdi.model.Incident.findById(Long.valueOf(rx.request().getFormAttribute("id")));
        inc.update("status = ?1 , end_date = ?2, duration = ?3, cause = ?4",
                rx.request().getFormAttribute("status"),
                LocalDateTime.parse(rx.request().getFormAttribute("end-date")),
                Duration.between(LocalDateTime.parse(rx.request().getFormAttribute("start-date")), LocalDateTime.parse(rx.request().getFormAttribute("end-date"))).toMinutes(),
                rx.request().getFormAttribute("cause"));
        rx.response().end("Incident updated");
    }

    @Blocking
    @Transactional
    @Route(path = "service/update", methods = Route.HttpMethod.POST)
    public  void updateService(RoutingExchange rx) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        org.vdi.model.Incident inc = org.vdi.model.Incident.findById(Long.valueOf(rx.request().getFormAttribute("id")));
        inc.update("status = ?1 , end_date = ?2, duration = ?3, cause =?4",
                rx.request().getFormAttribute("status"),
                LocalDateTime.parse(rx.request().getFormAttribute("end-date")),
                Duration.between(LocalDateTime.parse(rx.request().getFormAttribute("start-date")), LocalDateTime.parse(rx.request().getFormAttribute("end-date"))).toMinutes(),
                rx.request().getFormAttribute("cause"));
        rx.response().end("Incident updated");
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/listincidents")
    public List<org.vdi.model.Incident> getAll() {
        return org.vdi.model.Incident.list("status = ?1", "EN_COURS");
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
