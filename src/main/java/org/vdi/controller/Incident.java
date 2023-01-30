package org.vdi.controller;

import io.quarkus.qute.Template;
import org.vdi.repository.IncidentRepository;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
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

    /*@GET
    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance getAllIncidentView()
            throws TemplateException {
        List<org.vdi.model.Incident> incidents = org.vdi.model.Incident.listAll();
        return listIncident.data(Map.of("incidents", incidents));
    }*/

    /*@GET
    @Path("/create")
//    @Produces(MediaType.TEXT_HTML)
    public TemplateInstance createUserView()
            throws TemplateException, IOException {
//        org.vdi.model.Incident incident = new org.vdi.model.Incident();
//        Service service = new Service();
//        Map<String, Object> obj = new HashMap<>();
//        obj.put("incident", incident);
//        obj.put("isUpdate", false);
        List<Service> serviceList = Service.listAll();
//        Map<String, Object> s = new HashMap<>();
//        s.put("services", serviceList);
//        Map<String, Object> objList = new HashMap<>();
//        objList.putAll(obj);
//        objList.putAll(services);
        return addIncident.data("services",serviceList);
    }*/

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllIncidents() {
        List<org.vdi.model.Incident> incidents = incidentRepository.listAll();
        return Response.ok(incidents).build();
    }
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    @Path("/create")
    public Response createIncident(org.vdi.model.Incident incident) {
        incidentRepository.persist(incident);
        return Response.created(URI.create("/"+ incident.getId())).build();
    }






//    public TemplateInstance createIncident
//            (@BeanParam org.vdi.model.Incident incident)
//            throws TemplateException {
//        org.vdi.model.Incident incident = new org.vdi.model.Incident();
//        incident.setCause(cause);
//        incident.setDate_deb(date_deb);
//        incident.setDate_fin(date_fin);
//        incident.setService(service);
//        org.vdi.model.Incident.persist(incident);
//        incident.persist();
//        return getAllIncidentView();
//    }





















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
