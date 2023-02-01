package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.ArrayList;
import java.util.List;
@Path("/services")
public class Service {
    @Inject
    Template addService;

    @Inject
    Template footer;

    @GET
    public TemplateInstance get() {
        org.vdi.model.Service service = new org.vdi.model.Service();
        List<org.vdi.model.Service> services = new ArrayList<>();
        return addService.data("services", services);
    }


    @POST
    @Blocking
    @Transactional
    @Route(methods = Route.HttpMethod.POST, path = "/postservice")
    public void createSite(RoutingExchange rc) {
        org.vdi.model.Service service = new org.vdi.model.Service();
        service.setName(rc.request().getFormAttribute("name"));
        service.persist();
        rc.response().end("Service inserted");
    }


}
