package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "technologie")
public class Technologie extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long technoid;
    @Column(name = "name")
    public String name;
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "site_technologie", joinColumns = {@JoinColumn(name = "technoid")},
    inverseJoinColumns = {@JoinColumn(name = "id")})
    public Set<Site> site = new HashSet<Site>();

    public Long getTechnoid() {
        return technoid;
    }

    public void setTechnoid(Long technoid) {
        this.technoid = technoid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Site> getSite() {
        return site;
    }

    public void setSite(Set<Site> site) {
        this.site = site;
    }
}
