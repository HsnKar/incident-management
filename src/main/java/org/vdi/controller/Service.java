package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateException;
import io.quarkus.qute.TemplateInstance;
import org.vdi.repository.ServiceRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
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

    /*@GET
    @Produces(MediaType.APPLICATION_JSON)
    public TemplateInstance getAllServiceView()
            throws TemplateException {
        List<org.vdi.model.Service> services = serviceRepository.listAll();
        return listService.data(Map.of("services", services));
    }*/

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllServices() {
        List<org.vdi.model.Service> services = serviceRepository.listAll();
        return Response.ok(services).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createService(org.vdi.model.Service service) {
        serviceRepository.persist(service);
        return Response.status(Response.Status.OK).build();
    }

   /* @GET
    @Path("/create")
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance createServiceView()
            throws TemplateException, IOException {
        org.vdi.model.Service service = new org.vdi.model.Service();
        Map<String, Object> obj = new HashMap<>();
        obj.put("service", service);
        obj.put("isUpdate", false);
        return addService.data(obj);
    }*/

   /* @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("/update/{id}")
    public TemplateInstance updateService
            (@PathParam("id") Long id)
            throws TemplateException {
        org.vdi.model.Service service = org.vdi.model.Service.findById(id);
        Map<String, Object> obj = new HashMap<>();
        obj.put("service", service);
        obj.put("isUpdate", true);
        return addService.data(obj);
    }*/

    /*@POST
//    @Produces(MediaType.TEXT_HTML)
//    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    @Path("/create")

    public Response createService(org.vdi.model.Service service) {
        service.persist();
        return Response.status(Response.Status.OK).build();
    }*/
    /*public TemplateInstance createService
            (@FormParam("name") String name)
            throws TemplateException {
        org.vdi.model.Service service = new org.vdi.model.Service();
        service.setName(name);
        org.vdi.model.Service.persist(service);
        return getAllServiceView();
    }*/

    /*@POST
    @Path("/update/{id}")
    @Transactional
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance updateService
            (@FormParam("name") String name)
            throws TemplateException {
        org.vdi.model.Service service = new org.vdi.model.Service();
        service.name= name;
        return getAllServiceView();
    }*/
}
