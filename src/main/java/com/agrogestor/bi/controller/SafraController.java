package com.agrogestor.bi.controller;

import com.agrogestor.bi.dto.SafraRequestDTO;
import com.agrogestor.bi.dto.SafraResponseDTO;
import com.agrogestor.bi.service.SafraService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/safras")
public class SafraController {

    private final SafraService service;

    public SafraController(SafraService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SafraResponseDTO> criar(@Valid @RequestBody SafraRequestDTO dto) {
        SafraResponseDTO criada = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @GetMapping
    public ResponseEntity<List<SafraResponseDTO>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/propriedade/{propriedadeId}")
    public ResponseEntity<List<SafraResponseDTO>> listarPorPropriedade(@PathVariable Long propriedadeId) {
        return ResponseEntity.ok(service.listarPorPropriedade(propriedadeId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SafraResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SafraResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody SafraRequestDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}