package com.columbustheater.models;

import javax.persistence.*;

@Entity
@Table(name="sections")
public class Section extends ModelBase {
    @Column
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
