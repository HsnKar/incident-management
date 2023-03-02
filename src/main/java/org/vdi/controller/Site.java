package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.ArrayList;
import java.util.List;

@Path("/sites")
public class Site {

    @Inject
    Template addSite;

    @Inject
    Template listSite;

    @Inject
    Template navbar;

    @Inject
    Template footer;

    @Inject
    Template accueilSite;


    @GET
    public TemplateInstance getSiteList() {
        org.vdi.model.Site site = new org.vdi.model.Site();
        List<Site> sites = new ArrayList<>();
        return accueilSite.data("sites", sites);
    }

    @GET
    @Path("/listsite")
    public TemplateInstance getAllSiteList() {
        org.vdi.model.Site site = new org.vdi.model.Site();
        List<Site> sites = new ArrayList<>();
        return listSite.data("sites", sites);
    }

}