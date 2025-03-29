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
        return charactersRepository.findById(id).orElse(null);
    }
}
