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
import java.util.*;
@Path("/sites")
public class Site {

    @Inject
    Template addSite;

    @Inject
    Template listSite;

    @GET
    public TemplateInstance get() {
        org.vdi.model.Site site = new org.vdi.model.Site();
        List<Site> sites = new ArrayList<>();
        return addSite.data("sites", sites);
    }


    @POST
    @Blocking
    @Transactional
    @Route(methods = Route.HttpMethod.POST, path = "/postsite")
    public void createSite(RoutingExchange rc) {
        org.vdi.model.Site site = new org.vdi.model.Site();
        site.setName(rc.request().getFormAttribute("name"));
        site.persist();
        rc.response().end("Site inserted");
    }

}
