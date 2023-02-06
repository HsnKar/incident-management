package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RoutingExchange;
import io.smallrye.common.annotation.Blocking;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import java.time.LocalDate;
import java.util.*;
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


    @GET
    @Path("/postsite")
    public TemplateInstance getSiteForm() {
        org.vdi.model.Site site = new org.vdi.model.Site();
        List<Site> sites = new ArrayList<>();
        return addSite.data("sites", sites);
    }

    @POST
    @Path("/postsite")
    @Transactional
    public TemplateInstance createSite(@FormParam("name") String name,
                               @FormParam("longitude") long longitude,
                               @FormParam("latitude") long latitude,
                               @FormParam("budgetAttachement") String budgetAttachement,
                               @FormParam("date_MES_2G") String dms2G,
                               @FormParam("date_MES_3G") String dms3G,
                               @FormParam("date_MES_4G") String dms4G,
                               @FormParam("date_MES_4Gplus") String dms4Gplus,
                               @FormParam("date_MES_4G_TDD") String dms4Gtdd,
                               @FormParam("typologie") String typologie,
                               @FormParam("towerType") String towerType,
                               @FormParam("secteur") String secteur,
                               @FormParam("commune") String commune,
                               @FormParam("district") String district,
                               @FormParam("region") String region,
                               @FormParam("zoneOrange") String zoneOrange,
                               @FormParam("mutualite") String mutualite,
                               @FormParam("proprioTrans") String proprioTrans) {
        org.vdi.model.Site site = new org.vdi.model.Site();
        site.setName(name);
        site.setLongitude(longitude);
        site.setLatitude(latitude);
        site.setBudgetAttachement(budgetAttachement);
        if (!dms2G.isEmpty()){
            site.setDate_MES_2G(LocalDate.parse(dms2G));
        }
        if (!dms3G.isEmpty())
        site.setDate_MES_3G(LocalDate.parse(dms3G));
        if (!dms4G.isEmpty())
        site.setDate_MES_4G(LocalDate.parse(dms4G));
        if (!dms4Gplus.isEmpty())
        site.setDate_MES_4G_plus(LocalDate.parse(dms4Gplus));
        if (!dms4Gtdd.isEmpty())
        site.setDate_MES_4G_TDD(LocalDate.parse(dms4Gtdd));
        site.setTypologie(typologie);
        site.setTowerType(towerType);
        site.setSecteur(secteur);
        site.setCommune(commune);
        site.setDistrict(district);
        site.setRegion(region);
        site.setZoneOrange(zoneOrange);
        site.setMutualite(mutualite);
        site.setProprioTrans(proprioTrans);
        site.persist();
        return getSiteForm();
    }

}
