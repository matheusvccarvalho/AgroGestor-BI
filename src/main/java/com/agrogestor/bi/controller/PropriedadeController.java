
package com.agrogestor.bi.controller;

import com.agrogestor.bi.dto.PropriedadeRequestDTO;
import com.agrogestor.bi.dto.PropriedadeResponseDTO;
import com.agrogestor.bi.service.PropriedadeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/propriedades")
public class PropriedadeController {

    private final PropriedadeService service;

    public PropriedadeController(PropriedadeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PropriedadeResponseDTO> criar(
            @Valid @RequestBody PropriedadeRequestDTO dto) {

        PropriedadeResponseDTO criada = service.criar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @GetMapping
    public ResponseEntity<List<PropriedadeResponseDTO>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropriedadeResponseDTO> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropriedadeResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody PropriedadeRequestDTO dto) {

        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}
