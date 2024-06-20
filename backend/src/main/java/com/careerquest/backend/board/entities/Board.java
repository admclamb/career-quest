package com.careerquest.backend.board.entities;

import com.careerquest.backend.db.IdentifiableEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity()
@Table(name = "board")
public class Board extends IdentifiableEntity {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String newName) {
        name = newName;
    }
}
