package org.vdi.controller;

import com.oracle.svm.core.annotate.Inject;
import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Incident;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/reporting")
public class Report {
    //    @Inject
//    Template getreporting;
//    @Inject
//    Template accueilService;
    @Inject
    Template reportingbydate;
    @Location("reportingReseau")
    Template reportingReseau;

//    @Location("getreporting.html")
//    Template getreporting;
//
//    @GET
//    public TemplateInstance getServiceAccueil() {
//        List<org.vdi.model.Incident> incidentServices = org.vdi.model.Incident.list(
//                "select i.id, " +
//                        "i.cause, " +
//                        "i.startDate, " +
//                        "i.endDate, " +
//                        "i.duration, " +
//                        "i.createdAt, " +
//                        "i.closedAt, " +
//                        "i.criticality, " +
//                        "i.resolution, " +
//                        "s.name from Incident i join i.service s " +
//                        "where i.status = ?1", "EN_COURS");
//        List<org.vdi.model.Incident> incidentSites = org.vdi.model.Incident.list(
//                "select i.id, " +
//                        "i.cause, " +
//                        "i.startDate, " +
//                        "i.endDate, " +
//                        "i.duration, " +
//                        "i.createdAt, " +
//                        "i.closedAt, " +
//                        "i.criticality, " +
//                        "i.resolution, " +
//                        "s.name from Incident i join i.site s " +
//                        "where i.status = ?1", "EN_COURS");
////        long countIncidentSite = Incident.("select count(i) from Incident i join i.site s where i.status = ?1", "EN_COURS");
//
//        long countIncidentSite = incidentSites.size();
//        long countIncidentService = incidentServices.size();
//        Map<String, Object> obj = new HashMap<>();
//        obj.put("countService", countIncidentService);
//        obj.put("countSite", countIncidentSite);
//        obj.put("incidentServices", incidentServices);
//        obj.put("incidentSites", incidentSites);
//        return getreporting.data(obj);
//    }

    @GET
    @Path("/by-date")
    public List<Incident> getByDate(@QueryParam("startDate") String startDateStr,
                                    @QueryParam("endDate") String endDateStr) {

        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        return Incident.find("createdAt between ?1 and ?2", startDate, endDate).list();
    }

    @GET
    @Path("/reseau")
    public TemplateInstance getAllNetInc() {
        List<Incident> incidents = Incident.list("type.id =?1 and status =?2",  1L, "TERMINE");
        Map<String, Object> obj = new HashMap<>();
        obj.put("incidents", incidents);
        return reportingReseau.data(obj);
    }

    @GET
    @Path("/tick-net")
    public List<Incident> getAllNetTic() {
        return Incident.list("type.id =?1 and status =?2",  1L, "TERMINE");
    }

}
