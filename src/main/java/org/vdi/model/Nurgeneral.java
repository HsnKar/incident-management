package org.vdi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "nurgeneral")
public class Nurgeneral extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "nurgeneral")
    public List<Nursingle> nursingle;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Nursingle> getNursingle() {
        return nursingle;
    }

    public void setNursingle(List<Nursingle> nursingle) {
        this.nursingle = nursingle;
    }
}
