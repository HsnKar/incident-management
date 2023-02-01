package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Incident;
import org.vdi.model.Site;
import org.vdi.model.Status;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/accueil")
public class Accueil {

    @Inject
    Template accueil;

    @Inject
    Template footer;
    @GET
    public TemplateInstance getAllIncidents() {
        List<Incident> incidentServices = Incident.list(
                "select i.id, " +
                        "i.cause, " +
                        "i.startDate, " +
                        "i.endDate, " +
                        "i.duration, " +
                        "i.resolution, " +
                        "s.name from Incident i join i.service s " +
                        "where i.status = ?1", "EN_COURS");
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
        obj.put("incidentSites", incidentSites);
        return accueil.data(obj);
    }
}
