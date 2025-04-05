package com.prjvitor.naruto_api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prjvitor.naruto_api.entities.Characters;
import com.prjvitor.naruto_api.repository.CharactersRepository;

@Service
public class CharactersService {
    
    private final CharactersRepository charactersRepository;

    public CharactersService(CharactersRepository charactersRepository) {
        this.charactersRepository = charactersRepository;
    }
    
    // Métodos
    public List<Characters> getAllCharacters() {
        return charactersRepository.findAll();
    }

    public Characters getCharacterById(Long id) {
        return charactersRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Personagem com ID " + id + " não encontrado."));
    }

    public List<Characters> searchByName(String name) {
        return charactersRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Characters> searchByEstadoAndName(String estado, String name) {
        return charactersRepository.findByEstadoIgnoreCaseAndNameContainingIgnoreCase(estado, name);
    }
    
    public List<Characters> searchByGeneroAndName(String genero, String name) {
        return charactersRepository.findByGeneroIgnoreCaseAndNameContainingIgnoreCase(genero, name);
    }
    
    public List<Characters> searchByPatenteAndName(String patente, String name) {
        return charactersRepository.findByPatenteIgnoreCaseAndNameContainingIgnoreCase(patente, name);
    }

    public List<Characters> searchByVillageAndName(String village, String name) {
        return charactersRepository.findByVilaIgnoreCaseAndNameContainingIgnoreCase(village, name);
    }
    
    public List<Characters> searchByAffiliationAndName(String affiliation, String name) {
        return charactersRepository.findByAfiliacaoIgnoreCaseAndNameContainingIgnoreCase(affiliation, name);
    }
}
