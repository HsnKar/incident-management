package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Service;
import org.vdi.model.Site;
import org.vdi.model.Status;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/incidents")
@PermitAll
public class Incident {

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
        if (date_deb != null)
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
        obj.put("sites", service);
        obj.put("incidents", incident);
        obj.put("isUpdate", true);
        return addIncidentReseau.data(obj);
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

    @POST
    @Path("/reseau/{id}")
    public TemplateInstance updateIncidentReseau(@PathParam("id")Long id,
                                                 @FormParam("cause") String cause,
                                                 @FormParam("status") String status,
                                                 @FormParam("resolution") String resolution,
                                                 @FormParam("start-date")String date_deb,
                                                 @FormParam("end-date")String end_date,
                                                 @FormParam("site") Long siteId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Site site = Site.findById(siteId);
        if (site == null) {
            throw new NullPointerException("Oh nooo!");
        }
        incident.id = id;
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        incident.setEndDate(LocalDateTime.parse(end_date));
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(status);
        incident.site = site;
        incident.persist();
        return getReseauForm();
    }

    @PUT
    @Path("/service/{id}")
    @Transactional
    public TemplateInstance updateIncidentService(@PathParam("id")Long id,
                                                 @FormParam("cause") String cause,
                                                 @FormParam("status") String status,
                                                 @FormParam("resolution") String resolution,
                                                 @FormParam("start-date")String date_deb,
                                                 @FormParam("end-date")String end_date,
                                                 @FormParam("site") Long siteId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
//        org.vdi.model.Incident incidentUpdate = org.vdi.model.Incident.update("upadate incident ");
        Service service = Service.findById(siteId);
        if (service == null) {
            throw new NullPointerException("Oh nooo!");
        }
        incident.id = id;
        incident.setCause(cause);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        incident.setEndDate(LocalDateTime.parse(end_date));
        incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(status);
        incident.service = service;
        incident.persist();
        return getReseauForm();
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
