package com.prjvitor.naruto_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prjvitor.naruto_api.entities.Characters;
import com.prjvitor.naruto_api.service.CharactersService;

@RestController
@RequestMapping("/api")
public class CharactersController {
    
    private final CharactersService charactersService;

    public CharactersController(CharactersService charactersService) {
        this.charactersService = charactersService;
    }

    // Métodos

    @GetMapping("/characters")
    public List<Characters> getAllCharacters() {
        return charactersService.getAllCharacters();
    }

    @GetMapping("/characters/{id}")
    public Characters getCharacterById(Long id) {
        return charactersService.getCharacterById(id);
    }
}
