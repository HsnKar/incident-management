package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.repository.IncidentRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

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
    public TemplateInstance get() {
        List<Incident> incidents = incidentRepository.listAll();
        return addIncident.data("incidents", incidents);
    }

    @GET
    @Path("/list")
    public TemplateInstance geta() {
        return listIncident.data("listIncident", org.vdi.model.Incident.listAll());
    }


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

    @POST
    @Produces(MediaType.APPLICATION_FORM_URLENCODED)
    @Transactional
    public void createIncident(@FormParam("cause") String cause, @FormParam("resolution") String resolution, @FormParam("date_deb") Date date_deb) {
        org.vdi.model.Incident.create(cause, resolution, date_deb).persist();
    }
}
