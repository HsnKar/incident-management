package org.vdi.controller;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;
import org.vdi.model.Nursingle;
import org.vdi.model.Service;
import org.vdi.model.Site;
import org.vdi.model.Type;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

@Path("/incidents")
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
    @Inject
    Template accueil;

    @GET
    public TemplateInstance getAllIncidents() {
        List<org.vdi.model.Incident> incidentServices = org.vdi.model.Incident.list("select i.id, " + "i.cause, " + "i.startDate, " + "i.endDate, " + "i.duration, " + "i.createdAt, " + "i.closedAt, " + "i.criticality, " + "i.resolution, " + "s.name , i.customId from Incident i join i.service s " + "where i.status = ?1", "EN_COURS");
        List<org.vdi.model.Incident> incidentSites = org.vdi.model.Incident.list("select i.id, " + "i.cause, " + "i.startDate, " + "i.endDate, " + "i.duration, " + "i.createdAt, " + "i.closedAt, " + "i.criticality, " + "i.resolution, " + "s.name , i.customId from Incident i join i.site s join i.nursingle n " + "where i.status = ?1", "EN_COURS");
//        long countIncidentSite = Incident.("select count(i) from Incident i join i.site s where i.status = ?1", "EN_COURS");
        long countIncidentSite = incidentSites.size();
        long countIncidentService = incidentServices.size();
        Map<String, Object> obj = new HashMap<>();
        obj.put("countService", countIncidentService);
        obj.put("countSite", countIncidentSite);
        obj.put("incidentServices", incidentServices);
        obj.put("incidentSites", incidentSites);
        return listAllIncidents.data(obj);
    }

    @GET
    @Path("/reseau")
    public TemplateInstance getReseauForm() {
        List<Nursingle> energies = Nursingle.list("nurgeneral.id = ?1", 1L);
        List<Nursingle> transmissions = Nursingle.list("nurgeneral.id = ?1", 2L);
        List<Nursingle> systems = Nursingle.list("nurgeneral.id = ?1", 3L);
        List<Nursingle> works = Nursingle.list("nurgeneral.id = ?1", 4L);
        List<Nursingle> others = Nursingle.list("nurgeneral.id = ?1", 5L);
        List<Nursingle> disasters = Nursingle.list("nurgeneral.id = ?1", 6L);
        List<Nursingle> insecurities = Nursingle.list("nurgeneral.id = ?1", 7L);
        List<Site> sites = Site.listAll();
        Map<String, Object> objSites = new HashMap<>();
        objSites.put("energies", energies);
        objSites.put("transmissions", transmissions);
        objSites.put("systems", systems);
        objSites.put("works", works);
        objSites.put("others", others);
        objSites.put("disasters", disasters);
        objSites.put("insecurities", insecurities);
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


    // Try validation

    @POST
    @Path("/reseau")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public TemplateInstance createIncidentReseau(@Valid @FormParam("cause") String cause, @FormParam("status") String status, @FormParam("resolution") String resolution, @Valid @FormParam("start-date") String date_deb, @FormParam("type") Long typeId, @FormParam("criticality") String criticality, @FormParam("nursingle") Long nursingleId, @FormParam("end-date") String end_date, @FormParam("site") Long siteId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Nursingle nursingle = Nursingle.findById(nursingleId);
        Site site = Site.findById(siteId);
        Type type = Type.findById(typeId);
        if (site == null) {
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCriticality(criticality);
        incident.setCause(cause);
        incident.nursingle = nursingle;
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        if (end_date != null) incident.setEndDate(LocalDateTime.parse(end_date));
        if (date_deb != null && end_date != null)
            incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(status);
        incident.type = type;
        incident.site = site;
        incident.persist();
        return getReseauForm();
    }

//    @POST
//    @Path("/reseau")
//    @Transactional
//    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//    public TemplateInstance createIncidentReseau(@FormParam("cause") String cause, @FormParam("status") String status, @FormParam("resolution") String resolution, @FormParam("start-date") String date_deb, @FormParam("type") Long typeId, @FormParam("criticality") String criticality, @FormParam("nursingle") Long nursingleId, @FormParam("end-date") String end_date, @FormParam("site") Long siteId) {
//        org.vdi.model.Incident incident = new org.vdi.model.Incident();
//        Nursingle nursingle = Nursingle.findById(nursingleId);
//        Site site = Site.findById(siteId);
//        Type type = Type.findById(typeId);
//        if (site == null) {
//            throw new NullPointerException("Oh nooo!");
//        }
//        incident.setCriticality(criticality);
//        incident.setCause(cause);
//        incident.nursingle = nursingle;
//        incident.setResolution(resolution);
//        incident.setStartDate(LocalDateTime.parse(date_deb));
//        if (end_date != null) incident.setEndDate(LocalDateTime.parse(end_date));
//        if (date_deb != null && end_date != null)
//            incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
//        incident.setStatus(status);
//        incident.type = type;
//        incident.site = site;
//        incident.persist();
//        return getReseauForm();
//    }

    @POST
    @Path("/service")
    @Transactional

    public TemplateInstance createIncidentService(@FormParam("cause") String cause, @FormParam("status") String status, @FormParam("resolution") String resolution, @FormParam("start-date") String date_deb, @FormParam("criticality") String criticality, @FormParam("end-date") String end_date, @FormParam("type") Long typeId, @FormParam("service") Long serviceId) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Service service = Service.findById(serviceId);
        Type type = Type.findById(typeId);
        if (service == null) {
            throw new NullPointerException("Oh nooo!");
        }
        incident.setCause(cause);
        incident.setCriticality(criticality);
        incident.setResolution(resolution);
        incident.setStartDate(LocalDateTime.parse(date_deb));
        if (end_date != null) incident.setEndDate(LocalDateTime.parse(end_date));
        if (date_deb != null && end_date != null)
            incident.setDuration(Duration.between(incident.getStartDate(), incident.getEndDate()).toMinutes());
        incident.setStatus(status);
        incident.service = service;
        incident.type = type;
        incident.persist();
        return getServiceForm();
    }

    @GET
    @Path("/service/{id}")
    public TemplateInstance getServiceFormUpdate(@PathParam("id") long id) {
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
    public TemplateInstance getReseauFormUpdate(@PathParam("id") long id) {
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
    public TemplateInstance updateIncidentReseau(@FormParam("cause") String cause, @FormParam("status") String status, @FormParam("resolution") String resolution, @FormParam("start-date") String date_deb, @FormParam("end-date") String end_date, @FormParam("site") Long siteId) {
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

    // Using reactive routes to return the template

    @Blocking
    @Transactional
    @Route(path = "reseau/update", methods = Route.HttpMethod.POST, produces = "text/html")
    public void updateReseau(RoutingExchange rx) throws DataFormatException {

        org.vdi.model.Incident incident = new org.vdi.model.Incident();
//        List<org.vdi.model.Incident> a = org.vdi.model.Incident.listAll();
        org.vdi.model.Incident inc = org.vdi.model.Incident.findById(Long.valueOf(rx.request().getFormAttribute("id")));
        int result = LocalDateTime.parse(rx.request().getFormAttribute("start-date")).compareTo(LocalDateTime.parse(rx.request().getFormAttribute("end-date")));

        Map<String, Object> o = new HashMap<>();
        o.put("o", o);
        TemplateInstance templateInstance = accueil.instance();


//        if (result > 0) {
//            throw new DataFormatException("this date is not valid");
//        } else {
        PanacheEntityBase.update("status = ?1 , end_date = ?2, duration = ?3, cause = ?4 where id = ?5", rx.request().getFormAttribute("status"), LocalDateTime.parse(rx.request().getFormAttribute("end-date")), Duration.between(LocalDateTime.parse(rx.request().getFormAttribute("start-date")), LocalDateTime.parse(rx.request().getFormAttribute("end-date"))).toMinutes(), rx.request().getFormAttribute("cause"), Long.valueOf(rx.request().getFormAttribute("id")));
//            rx.response().end("Incident updated" + inc.getCause());
        rx.response().end(getAllIncidents().render());
//        }
    }

//    @Blocking
//    @Transactional
//    @Route(path = "reseau/update", methods = Route.HttpMethod.POST)
//    public void updateReseau(RoutingExchange rx) throws DataFormatException {
//        org.vdi.model.Incident incident = new org.vdi.model.Incident();
//        List<org.vdi.model.Incident> a = org.vdi.model.Incident.listAll();
//        org.vdi.model.Incident inc = org.vdi.model.Incident.findById(Long.valueOf(rx.request().getFormAttribute("id")));
//        int result = LocalDateTime.parse(rx.request().getFormAttribute("start-date")).compareTo(LocalDateTime.parse(rx.request().getFormAttribute("end-date")));
////        if (result > 0) {
////            throw new DataFormatException("this date is not valid");
////        } else {
//            inc.update("status = ?1 , end_date = ?2, duration = ?3, cause = ?4 where id = ?5",
//                    rx.request().getFormAttribute("status"),
//                    LocalDateTime.parse(rx.request().getFormAttribute("end-date")),
//                    Duration.between(LocalDateTime.parse(rx.request().getFormAttribute("start-date")), LocalDateTime.parse(rx.request().getFormAttribute("end-date"))).toMinutes(),
//                    rx.request().getFormAttribute("cause"),
//                    Long.valueOf(rx.request().getFormAttribute("id")));
//            rx.response().end("Incident updated" + inc.getCause());
////        }
//    }

    @Blocking
    @Transactional
    @Route(path = "service/update", methods = Route.HttpMethod.POST)
    public void updateService(RoutingExchange rx) {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        org.vdi.model.Incident inc = org.vdi.model.Incident.findById(Long.valueOf(rx.request().getFormAttribute("id")));
        PanacheEntityBase.update("status = ?1 , end_date = ?2, duration = ?3, cause =?4", rx.request().getFormAttribute("status"), LocalDateTime.parse(rx.request().getFormAttribute("end-date")), Duration.between(LocalDateTime.parse(rx.request().getFormAttribute("start-date")), LocalDateTime.parse(rx.request().getFormAttribute("end-date"))).toMinutes(), rx.request().getFormAttribute("cause"), Long.valueOf(rx.request().getFormAttribute("id")));
        rx.response().end(getAllIncidents().render());
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/listincidents")
    public List<org.vdi.model.Incident> getAll() {
        return org.vdi.model.Incident.list("status = ?1 ", "EN_COURS");
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/showonmap")
    public List<org.vdi.model.Incident> showOnMap() {
        return org.vdi.model.Incident.list("type.id =?1 and status = ?2", 1L, "EN_COURS");
    }


    // The Result Class

    public static class Result {

        private final String message;
        private final boolean success;

        Result(String message) {
            this.success = true;
            this.message = message;
        }

        Result(Set<? extends ConstraintViolation<?>> violations) {
            this.success = false;
            this.message = violations.stream().map(cv -> cv.getMessage()).collect(Collectors.joining(", "));
        }

        public String getMessage() {
            return message;
        }

        public boolean isSuccess() {
            return success;
        }

    }
}
