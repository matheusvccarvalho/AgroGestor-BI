package com.agrogestor.bi.controller;

import com.agrogestor.bi.dto.CustoRequestDTO;
import com.agrogestor.bi.dto.CustoResponseDTO;
import com.agrogestor.bi.service.CustoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/custos")
public class CustoController {

    private final CustoService service;

    public CustoController(CustoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CustoResponseDTO> criar(@Valid @RequestBody CustoRequestDTO dto) {
        CustoResponseDTO criada = service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @GetMapping
    public ResponseEntity<List<CustoResponseDTO>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/safra/{safraId}")
    public ResponseEntity<List<CustoResponseDTO>> listarPorSafra(@PathVariable Long safraId) {
        return ResponseEntity.ok(service.listarPorSafra(safraId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustoResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody CustoRequestDTO dto) {
        return ResponseEntity.ok(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}