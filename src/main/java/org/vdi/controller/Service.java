package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.repository.ServiceRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/services")
public class Service {
    @Inject
    Template addService;

    @Inject
    Template listService;

    @Inject
    ServiceRepository serviceRepository;


    @GET
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public TemplateInstance listAllServices() {
        List<org.vdi.model.Service> services = serviceRepository.listAll();
        Map<String, Object> obj = new HashMap<>();
        obj.put("services", services);
        return addService.data(obj);
    }

    @POST
    @Path("/create")
    @Transactional
    public Response createService(org.vdi.model.Service service) {
        serviceRepository.persist(service);
        return Response.ok(service).build();
    }


}
