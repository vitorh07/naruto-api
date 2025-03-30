package com.prjvitor.naruto_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prjvitor.naruto_api.entities.Characters;

public interface CharactersRepository extends JpaRepository<Characters, Long> {
    List<Characters> findByNameContainingIgnoreCase(String name);
}