package org.vdi.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.common.annotation.Blocking;
import io.vertx.ext.web.RoutingContext;
import org.apache.camel.spi.annotations.RoutesLoader;
import org.vdi.repository.IncidentRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import static java.util.Objects.requireNonNull;

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
    IncidentRepository incidentRepository;

    @GET
    public TemplateInstance get() {
        List<Incident> incidents = incidentRepository.listAll();
        return addIncident.data("incidents", incidents);
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
    @Transactional
    public void createIncident(@FormParam("cause") String cause, @FormParam("resolution") String resolution, @FormParam("date_deb")Date date_deb) {
        org.vdi.model.Incident.create(cause, resolution, date_deb).persist();
    }
}
