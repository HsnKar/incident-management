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


    @SequenceGenerator(
            name = "is",
            sequenceName = "inc_id_seq",
            allocationSize = 1,
            initialValue = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "is")
    @Column(name = "ticket_id")
    public String ticket_id;
    @NotBlank(message = "Cause cannot be blank")
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criticality")
    public Criticality criticality;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nur")
    public Nur nur;

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

    public Criticality getCriticality() {
        return criticality;
    }

    public void setCriticality(Criticality criticality) {
        this.criticality = criticality;
    }
    @PreUpdate
    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDate.now();
    }

    public String getTicket_id() {
        return ticket_id;
    }

    public void setTicket_id(String ticket_id) {
        this.ticket_id = ticket_id;
    }

    public Nur getNur() {
        return nur;
    }

    public void setNur(Nur nur) {
        this.nur = nur;
    }
}
