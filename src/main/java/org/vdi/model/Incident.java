package org.vdi.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
public class Incident {

    @Id
    @GeneratedValue
    private Long id;

    private String cause;
    @JsonFormat(pattern = "dd-MMM-yyyy HH:mm")
    private LocalDateTime date_deb;
    @JsonFormat(pattern = "dd-MMM-yyyy HH:mm")
    private LocalDateTime date_fin;
    private Long duree;
    /*    @OneToOne*/
    private String resolution;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site")
    private Site site;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service")
    private Service service;
    @PrePersist
    @PreUpdate
    public void duration() {
        if (date_deb != null && date_fin !=null)
            this.duree = Duration.between(date_deb, date_fin).toMinutes();
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

    public LocalDateTime getDate_deb() {
        return date_deb;
    }

    public void setDate_deb(LocalDateTime date_deb) {
        this.date_deb = date_deb;
    }

    public LocalDateTime getDate_fin() {
        return date_fin;
    }

    public void setDate_fin(LocalDateTime date_fin) {
        this.date_fin = date_fin;
    }

    public Long getDuree() {
        return duree;
    }

    public void setDuree(Long duree) {
        this.duree = duree;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
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
}
