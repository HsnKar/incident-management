package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
public class Site {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private Long latitude;

    private Long longitude;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "site")
    private List<Incident> incident;

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

    public Long getLatitude() {
        return latitude;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public Long getLongitude() {
        return longitude;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }

    public List<Incident> getIncident() {
        return incident;
    }

    public void setIncident(List<Incident> incident) {
        this.incident = incident;
    }
}

