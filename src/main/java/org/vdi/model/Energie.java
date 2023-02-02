package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "energie")
public class Energie extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    public Long energieid;
    @Column(name = "name")
    public String name;
    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "site_energie", joinColumns = {@JoinColumn(name = "energieid")},
    inverseJoinColumns = {@JoinColumn(name = "id")})
    public Set<Site> site = new HashSet<Site>();

    public Long getEnergieid() {
        return energieid;
    }

    public void setEnergieid(Long energieid) {
        this.energieid = energieid;
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
