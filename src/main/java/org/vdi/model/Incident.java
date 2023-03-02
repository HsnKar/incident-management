package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident")
public class Incident extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site")
    public Site site;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service")
    public Service service;
    @Column(name = "status")
    public String status;
    @Column(name = "created_at")
    public LocalDate createdAt;
    @Column(name = "closed_at")
    public LocalDate closedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category")
    public Category category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type")
    public Type type;
    @Column(name = "criticality")
    public String criticality;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nursingle")
    public Nursingle nursingle;
    @NotBlank(message = "Cause cannot be blank")
    @Column(name = "cause")
    String cause;
    @Column(name = "start_date")
    LocalDateTime startDate;
    @Column(name = "end_date")
    LocalDateTime endDate;
    @Column(name = "resolution")
    String resolution;
    @Column(name = "duration")
    long duration;

    @PreUpdate
    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDate.now();
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(LocalDate closedAt) {
        this.closedAt = closedAt;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getCriticality() {
        return criticality;
    }

    public void setCriticality(String criticality) {
        this.criticality = criticality;
    }

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

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public Nursingle getNursingle() {
        return nursingle;
    }

    public void setNursingle(Nursingle nursingle) {
        this.nursingle = nursingle;
    }
}
