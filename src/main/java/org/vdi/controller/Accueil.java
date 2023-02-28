package org.vdi.controller;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Incident;
import org.vdi.model.Site;
import org.vdi.model.Status;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.Collections;
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
        List<Incident> incidentServices = Incident.list(
                "select i.id, " +
                        "i.cause, " +
                        "i.startDate, " +
                        "i.endDate, " +
                        "i.duration, " +
                        "i.resolution, " +
                        "c.criticality, " +
                        "s.name from Incident i join i.service s join i.criticality c "  +
                        "where i.status = ?1", "EN_COURS");
        PanacheQuery<Incident> incidentPanacheQuery = Incident.find("select i.id, " +
                "i.cause, " +
                "i.startDate, " +
                "i.endDate, " +
                "i.duration, " +
                "i.resolution, " +
                "s.name from Incident i join i.site s " +
                "where i.status = ?1", "EN_COURS");
        incidentPanacheQuery.page(Page.of(0,3));
        List<Incident> firstpage = incidentPanacheQuery.list();
        List<Incident> incidentSites = Incident.list(
                "select i.id, " +
                        "i.cause, " +
                        "i.startDate, " +
                        "i.endDate, " +
                        "i.duration, " +
                        "i.resolution, " +
                        "s.name from Incident i join i.site s " +
                        "where i.status = ?1", "EN_COURS");
//        long countIncidentSite = Incident.("select count(i) from Incident i join i.site s where i.status = ?1", "EN_COURS");
        long countIncidentSite = incidentSites.size();
        long countIncidentService = incidentServices.size();
        Map<String, Object> obj = new HashMap<>();
        obj.put("countService", countIncidentService);
        obj.put("countSite",countIncidentSite);
        obj.put("incidentServices", incidentServices);
        obj.put("incidentSites", firstpage);
        return accueil.data(obj);
    }
}
