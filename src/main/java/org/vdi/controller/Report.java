package org.vdi.controller;

import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import org.vdi.model.Service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.ArrayList;
import java.util.List;

@Path("/reporting")
public class Report {
//    @Inject
//    Template getreporting;
//    @Inject
//    Template accueilService;

    @Location("getreporting.html")
    Template getreporting;

    @GET
    public TemplateInstance getServiceAccueil() {
        org.vdi.model.Service service = new org.vdi.model.Service();
        List<Service> services = new ArrayList<>();
        return getreporting.data("services", services);
    }

}
