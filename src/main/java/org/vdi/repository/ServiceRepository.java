package org.vdi.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.vdi.model.Service;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ServiceRepository  implements PanacheRepository<Service> {
}
