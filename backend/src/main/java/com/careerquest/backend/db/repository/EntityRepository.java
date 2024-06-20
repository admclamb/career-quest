package com.careerquest.backend.db.repository;

import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;

import com.careerquest.backend.db.Id;
import com.careerquest.backend.db.IdentifiableEntity;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.transaction.annotation.Transactional;

public class EntityRepository<Entity extends IdentifiableEntity> {
    @Autowired()
    private JpaRepository<Entity, Id> entityRepository;

    @Transactional(readOnly = true)
    protected Entity findOne(Example<Entity> example) {
        Entity entity = entityRepository.findOne(example).orElse(null);

        if (entity == null) {
            throw new EntityNotFoundException();
        }

        return entity;
    }

    @Transactional(readOnly = true)
    protected List<Entity> find(Example<Entity> example,
            Function<FetchableFluentQuery<Entity>, List<Entity>> queryFunction) {
        return entityRepository.findBy(example, queryFunction);
    }

    @Transactional
    public void create(Entity entity) {
        entityRepository.save(entity);
    }

    @Transactional
    public void upsert(Entity entity) {
        entityRepository.save(entity);
    }
}
