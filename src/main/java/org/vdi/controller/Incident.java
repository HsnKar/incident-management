package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Service;
import org.vdi.repository.IncidentRepository;
import org.vdi.repository.ServiceRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/incidents")
public class Incident {


    @Inject
    Template addIncident;
    @Inject
    Template listIncident;
    @Inject
    IncidentRepository incidentRepository;

    @Inject
    ServiceRepository serviceRepository;

    @GET
    @Path("/create")
    public TemplateInstance createIncident() {
        List<org.vdi.model.Incident> incidents = incidentRepository.listAll();
        List<Service> services = serviceRepository.listAll();
        Map<String, Object> obj = new HashMap<>();
        obj.put("incidents", incidents);
        obj.put("services", services);
        return addIncident.data(obj);
    }

    @POST
    @Path("/create")
    @Transactional
    public Response createIncident(org.vdi.model.Incident incident, @FormParam("service") Long id) {
        Service service = serviceRepository.findById(id);
        /*if (service == null) {
            throw new NullPointerException();
        }*/
        incident.setService(service);
        incidentRepository.persist(incident);
        return Response.ok(incident).build();
    }

}
