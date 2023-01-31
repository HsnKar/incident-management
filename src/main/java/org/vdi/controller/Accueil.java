package org.vdi.controller;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Incident;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/accueil")
public class Accueil {

    @Inject
    Template accueil;
    @GET
    public TemplateInstance getAllIncidents() {
        List<Incident> incidents = Incident.listAll();
        Map<String, Object> obj = new HashMap<>();
        obj.put("incidents", incidents);
        return accueil.data(obj);
    }
}
