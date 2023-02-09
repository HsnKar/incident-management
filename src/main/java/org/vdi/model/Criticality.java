package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "criticality")
public class Criticality extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "criticality")
    public String criticality;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "criticality")
    public List<Incident> incident;
}
