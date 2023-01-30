package org.vdi.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.vdi.model.Incident;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class IncidentRepository implements PanacheRepository<Incident> {
}
