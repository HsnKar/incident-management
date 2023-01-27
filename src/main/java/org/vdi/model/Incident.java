package org.vdi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Incident extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public Long id;

    public String cause;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy")
    public java.sql.Date date_deb;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MMM-yyyy")
    public Date date_fin;
    public Long duree;
/*    @OneToOne*/
    public String resolution;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site")
    public Site site;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service")
    public Service service;
/*    @PrePersist
    @PreUpdate
    public void duration() {
        if (date_deb != null && date_fin !=null)
            this.duree = Duration.between(date_deb, date_fin).toMinutes();
    }*/

    public static Incident findByCause(String cause) {
        return find("cause", cause).firstResult();
    }


    public static Incident create(String cause, String resolution, java.sql.Date date_deb, Service service) {
        Incident incident = new Incident();
        incident.cause = cause;
        incident.resolution = resolution;
        incident.date_deb = date_deb;
        incident.service = service;
        return incident;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public Long getDuree() {
        return duree;
    }

    public void setDuree(Long duree) {
        this.duree = duree;
    }

    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public java.sql.Date getDate_deb() {
        return date_deb;
    }

    public void setDate_deb(java.sql.Date date_deb) {
        this.date_deb = date_deb;
    }

    public Date getDate_fin() {
        return date_fin;
    }

    public void setDate_fin(Date date_fin) {
        this.date_fin = date_fin;
    }
}
