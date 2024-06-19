package com.careerquest.backend.db;

import org.springframework.data.annotation.Id;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

public class IdentifiableEntity {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Id id;
}
