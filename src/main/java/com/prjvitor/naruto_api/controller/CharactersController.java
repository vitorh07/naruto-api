package com.prjvitor.naruto_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public Characters getCharacterById(@PathVariable Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("O ID deve ser um número positivo.");
        }
        return charactersService.getCharacterById(id);
    }

    @GetMapping("/characters/search")
    public List<Characters> searchCharacters(@RequestParam(required = false) String name) {
        if (name != null && !name.isEmpty()) {
            return charactersService.searchByName(name);
        }
        return charactersService.getAllCharacters();
    }
}
