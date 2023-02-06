package org.vdi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "site")
public class Site extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "code_site")
    public String code_site;
    @Column(name = "name")
    public String name;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "site")
    public List<Incident> incidents;
    @Column(name = "statut")
    public String statut;
    @Column(name = "longitude")
    public long longitude;
    @Column(name = "latitude")
    public long latitude;
    @Column(name = "date_MES")
    public LocalDate date_MES;
    @Column(name = "date_MES_2G")
    public LocalDate date_MES_2G;
    @Column(name = "date_MES_3G")
    public LocalDate date_MES_3G;
    @Column(name = "date_MES_4G")
    public LocalDate date_MES_4G;
    @Column(name = "date_MES_4Gplus")
    public LocalDate date_MES_4G_plus;
    @Column(name = "date_MES_4G_TDD")
    public LocalDate date_MES_4G_TDD;
    @Column(name = "budgetAttachement")
    public String budgetAttachement;
    @Column(name = "typologie")
    public String typologie;
    @Column(name = "towerType")
    public String towerType;
    @Column(name = "secteur")
    public String secteur;
    @Column(name = "commune")
    public String commune;
    @Column(name = "district")
    public String district;
    @Column(name = "region")
    public String region;
    @Column(name = "zoneOrange")
    public String zoneOrange;
    @Column(name = "mutualite")
    public String mutualite;
    @Column(name = "proprioTrans")
    public String proprioTrans;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire")
    public Proprietaire proprietaire;
    @ManyToMany(mappedBy = "site")
    public Set<Technologie> technologie = new HashSet<Technologie>();
    @ManyToMany(mappedBy = "site")
    public Set<Energie> energie = new HashSet<Energie>();
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

    public List<Incident> getIncidents() {
        return incidents;
    }

    public void setIncidents(List<Incident> incidents) {
        this.incidents = incidents;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public long getLongitude() {
        return longitude;
    }

    public void setLongitude(long longitude) {
        this.longitude = longitude;
    }

    public long getLatitude() {
        return latitude;
    }

    public void setLatitude(long latitude) {
        this.latitude = latitude;
    }

    public LocalDate getDate_MES_2G() {
        return date_MES_2G;
    }

    public void setDate_MES_2G(LocalDate date_MES_2G) {
        this.date_MES_2G = date_MES_2G;
    }

    public LocalDate getDate_MES_3G() {
        return date_MES_3G;
    }

    public void setDate_MES_3G(LocalDate date_MES_3G) {
        this.date_MES_3G = date_MES_3G;
    }

    public LocalDate getDate_MES_4G() {
        return date_MES_4G;
    }

    public void setDate_MES_4G(LocalDate date_MES_4G) {
        this.date_MES_4G = date_MES_4G;
    }

    public LocalDate getDate_MES_4G_plus() {
        return date_MES_4G_plus;
    }

    public void setDate_MES_4G_plus(LocalDate date_MES_4G_plus) {
        this.date_MES_4G_plus = date_MES_4G_plus;
    }

    public LocalDate getDate_MES_4G_TDD() {
        return date_MES_4G_TDD;
    }

    public void setDate_MES_4G_TDD(LocalDate date_MES_4G_TDD) {
        this.date_MES_4G_TDD = date_MES_4G_TDD;
    }

    public String getBudgetAttachement() {
        return budgetAttachement;
    }

    public void setBudgetAttachement(String budgetAttachement) {
        this.budgetAttachement = budgetAttachement;
    }

    public String getTypologie() {
        return typologie;
    }

    public void setTypologie(String typologie) {
        this.typologie = typologie;
    }

    public String getTowerType() {
        return towerType;
    }

    public void setTowerType(String towerType) {
        this.towerType = towerType;
    }

    public String getSecteur() {
        return secteur;
    }

    public void setSecteur(String secteur) {
        this.secteur = secteur;
    }

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getZoneOrange() {
        return zoneOrange;
    }

    public void setZoneOrange(String zoneOrange) {
        this.zoneOrange = zoneOrange;
    }

    public String getMutualite() {
        return mutualite;
    }

    public void setMutualite(String mutualite) {
        this.mutualite = mutualite;
    }

    public String getProprioTrans() {
        return proprioTrans;
    }

    public void setProprioTrans(String proprioTrans) {
        this.proprioTrans = proprioTrans;
    }

    public Proprietaire getProprietaire() {
        return proprietaire;
    }

    public void setProprietaire(Proprietaire proprietaire) {
        this.proprietaire = proprietaire;
    }

    public Set<Technologie> getTechnologie() {
        return technologie;
    }

    public void setTechnologie(Set<Technologie> technologie) {
        this.technologie = technologie;
    }

    public Set<Energie> getEnergie() {
        return energie;
    }

    public void setEnergie(Set<Energie> energie) {
        this.energie = energie;
    }

    public LocalDate getDate_MES() {
        return date_MES;
    }

    public void setDate_MES(LocalDate date_MES) {
        this.date_MES = date_MES;
    }

    public String getCode_site() {
        return code_site;
    }

    public void setCode_site(String code_site) {
        this.code_site = code_site;
    }
}
