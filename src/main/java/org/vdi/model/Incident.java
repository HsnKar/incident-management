package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident")
public class Incident extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "cause")
    String cause;

    @Column(name = "start_date")
    LocalDateTime startDate;

    @Column(name = "end_date")
    LocalDateTime endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site")
    public Site site;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service")
    public Service service;

    @Column(name = "resolution")
    String resolution;

    @Column(name = "duration")
    long duration;
    @Column(name = "status")
    public String status;
    @Column(name = "priority")
    public String priority;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category")
    public Category category;

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
