package org.vdi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;
@Entity
@Table(name = "category")
public class Category extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "nom")
    public String nom;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    public List<Incident> incident;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    public List<Contenu> contenu;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public List<Incident> getIncident() {
        return incident;
    }

    public void setIncident(List<Incident> incident) {
        this.incident = incident;
    }

    public List<Contenu> getContenu() {
        return contenu;
    }

    public void setContenu(List<Contenu> contenu) {
        this.contenu = contenu;
    }
}
