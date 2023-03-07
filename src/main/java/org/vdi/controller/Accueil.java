package org.vdi.controller;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Incident;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/accueil")
@PermitAll
public class Accueil {

    @Inject
    Template accueil;

    @Inject
    Template footer;

    @Inject
    Template navbar;

    @GET
    public TemplateInstance getAllIncidents() {
        List<org.vdi.model.Incident> incidentServices = org.vdi.model.Incident.list("select i.id, " + "i.cause, " + "i.startDate, " + "i.endDate, " + "i.duration, " + "i.resolution, " + "i.criticality, " + "s.name , i.customId from Incident i join i.service s " + "where i.status = ?1", "EN_COURS");
        PanacheQuery<org.vdi.model.Incident> incidentPanacheQuery = org.vdi.model.Incident.find("select i.id, " + "i.cause, " + "i.startDate, " + "i.endDate, " + "i.duration, " + "i.resolution, " + "i.criticality, " + "s.name , i.customId from Incident i join i.site s " + "where i.status = ?1", "EN_COURS");
        incidentPanacheQuery.page(Page.of(0, 3));
        List<org.vdi.model.Incident> firstpage = incidentPanacheQuery.list();
        List<org.vdi.model.Incident> incidentSites = Incident.list("select i.id, " + "n.name, " + "i.startDate, " + "i.endDate, " + "i.duration, " + "i.resolution, " + "i.criticality, " + "s.name , i.customId from Incident i join i.site s join i.nursingle n " + "where i.status = ?1", "EN_COURS");
        long countIncidentSite = incidentSites.size();
        long countIncidentService = incidentServices.size();
        Map<String, Object> obj = new HashMap<>();
        obj.put("countService", countIncidentService);
        obj.put("countSite", countIncidentSite);
        obj.put("incidentServices", incidentServices);
        obj.put("incidentSites", incidentSites);
        return accueil.data(obj);
    }
}
