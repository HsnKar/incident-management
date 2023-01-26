package org.vdi.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Resolution {
    @Id
    @GeneratedValue
    private Long id;

    private String content;

    /*@OneToMany(cascade = CascadeType.ALL, mappedBy = "resolution")
    private List<Incident> incidents;*/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

