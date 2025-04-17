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
    public List<Characters> searchCharacters(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String filter) {
        if (filter != null && !filter.isEmpty()) {
            filter = filter.toLowerCase().replace(" ", "_");
            switch (filter) {
                case "vivo":
                    return charactersService.searchByEstadoAndName("Vivo", name);
                case "morto":
                    return charactersService.searchByEstadoAndName("Morto", name);
                case "masculino":
                    return charactersService.searchByGeneroAndName("Masculino", name);
                case "feminino":
                    return charactersService.searchByGeneroAndName("Feminino", name);
                case "genin":
                case "jounin":
                case "sannin":
                    return charactersService.searchByPatenteAndName(filter, name);
                case "konohagakure":
                case "sunagakure":
                case "kirigakure":
                case "iwagakure":
                case "kumogakure":
                case "amegakure":
                    return charactersService.searchByVillageAndName(filter, name);
                case "akatsuki":
                case "forcas_aliadas_shinobi":
                case "monte_myouboku":
                case "floresta_shikkotsu":
                case "caverna_ryuuchi":
                    return charactersService.searchByAffiliationAndName(filter, name);
                default:
                    break;
            }
        }
        if (name != null && !name.isEmpty()) {
            return charactersService.searchByName(name);
        }
        return charactersService.getAllCharacters();
    }
}
