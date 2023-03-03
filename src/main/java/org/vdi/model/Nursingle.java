package org.vdi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "nursingle")
public class Nursingle extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nurgeneral")
    public Nurgeneral nurgeneral;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "nursingle")
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

    public Nurgeneral getNurgeneral() {
        return nurgeneral;
    }

    public void setNurgeneral(Nurgeneral nurgeneral) {
        this.nurgeneral = nurgeneral;
    }

    public List<Incident> getIncident() {
        return incident;
    }

    public void setIncident(List<Incident> incident) {
        this.incident = incident;
    }
}
