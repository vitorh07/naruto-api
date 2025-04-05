package com.prjvitor.naruto_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prjvitor.naruto_api.entities.Characters;

public interface CharactersRepository extends JpaRepository<Characters, Long> {
    List<Characters> findByNameContainingIgnoreCase(String name);

    List<Characters> findByEstadoIgnoreCaseAndNameContainingIgnoreCase(String estado, String name);

    List<Characters> findByGeneroIgnoreCaseAndNameContainingIgnoreCase(String genero, String name);

    List<Characters> findByPatenteIgnoreCaseAndNameContainingIgnoreCase(String patente, String name);

    List<Characters> findByVilaIgnoreCaseAndNameContainingIgnoreCase(String vila, String name);

    List<Characters> findByAfiliacaoIgnoreCaseAndNameContainingIgnoreCase(String afiliacao, String name);
}