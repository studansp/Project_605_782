package com.columbustheater.models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="seats")
public class Seat extends ModelBase {
    @Column
    private int row;
    @Column
    private int seat;

    @ManyToOne
    @JoinColumn(name = "sectionId")
    private Section section;

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getSeat() {
        return seat;
    }

    public void setSeat(int seat) {
        this.seat = seat;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }
}
