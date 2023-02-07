package org.vdi.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import org.eclipse.microprofile.openapi.annotations.tags.Tags;

import javax.persistence.*;

@Entity
@Table(name = "contenu")
public class Contenu extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name = "nom")
    public String nom;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category")
    public Category category;
}
