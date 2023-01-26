package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class Service extends PanacheEntityBase {
    @Id
    @GeneratedValue
    public Long id;
    public String name;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "service")
    public List<Incident> incident;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Incident> getIncident() {
        return incident;
    }

    public void setIncident(List<Incident> incident) {
        this.incident = incident;
    }
}

