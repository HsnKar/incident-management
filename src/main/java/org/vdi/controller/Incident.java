package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateException;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Service;
import org.vdi.repository.IncidentRepository;
import org.vdi.repository.ServiceRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/incidents")
public class Incident {

/*
    private final Template addIncident;

    public Incident(Template addIncident) {
        this.addIncident = requireNonNull(addIncident, "page is required");
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance get(@QueryParam("name") String name) {
        return addIncident.data("name", name);
    }

*/


    @Inject
    Template addIncident;
    @Inject
    Template listIncident;
    @Inject
    IncidentRepository incidentRepository;

    @GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getAllIncidentView()
            throws TemplateException {
        List<org.vdi.model.Incident> incidents = org.vdi.model.Incident.listAll();
        return listIncident.data(Map.of("incidents", incidents));
    }

    @GET
    @Path("/create")
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance createUserView()
            throws TemplateException, IOException {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        Map<String, Object> obj = new HashMap<>();
        obj.put("incident", incident);
        obj.put("isUpdate", false);
        return addIncident.data(obj);
    }


    @POST
    @Produces(MediaType.TEXT_HTML)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("/create")
    public TemplateInstance createIncident
            (@FormParam("cause") String cause,
             @FormParam("date_deb") Date date_deb,
             @FormParam("date_fin") Date date_fin,
             @FormParam("service") Service service)
            throws TemplateException {
        org.vdi.model.Incident incident = new org.vdi.model.Incident();
        incident.setCause(cause);
        incident.setDate_deb(date_deb);
        incident.setDate_fin(date_fin);
        incident.service = service;
        org.vdi.model.Incident.persist(incident);
        return getAllIncidentView();
    }





















   /* @GET
    public TemplateInstance get() {
        List<Incident> incidents = incidentRepository.listAll();
        return addIncident.data("incidents", incidents);
    }
*/
/*
    @GET
    @Path("/list")
    public TemplateInstance geta() {
        return listIncident.data("listIncident", org.vdi.model.Incident.listAll());
    }
*/


/*    @POST
    public Response createIncident(@BeanParam org.vdi.model.Incident incident, RoutingContext routingContext) {
        System.out.println("eto");
        System.out.println(incident.getCause());
        System.out.println(incident.getDate_deb());

        System.out.println("test");
        System.out.println(routingContext.request().getFormAttribute("cause"));

        incident.persist();
        return Response.ok().build();
    }*/

    /*@POST
    @Produces(MediaType.APPLICATION_FORM_URLENCODED)
    @Transactional
    public void createIncident(@FormParam("cause") String cause, @FormParam("resolution") String resolution, @FormParam("date_deb") java.sql.Date date_deb, @FormParam("service") Service service) {
        org.vdi.model.Incident.create(cause, resolution, date_deb, service).persist();
    }*/



}
