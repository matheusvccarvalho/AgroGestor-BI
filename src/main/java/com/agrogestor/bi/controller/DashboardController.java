package com.agrogestor.bi.controller;

import com.agrogestor.bi.dto.CustoEvolucaoMensalDTO;
import com.agrogestor.bi.dto.CustoPorCategoriaDTO;
import com.agrogestor.bi.dto.CustoPorSafraDTO;
import com.agrogestor.bi.dto.DashboardResumoDTO;
import com.agrogestor.bi.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/resumo")
    public ResponseEntity<DashboardResumoDTO> getResumo() {
        return ResponseEntity.ok(service.getResumo());
    }

    @GetMapping("/custos-por-categoria")
    public ResponseEntity<List<CustoPorCategoriaDTO>> getCustosPorCategoria(
            @RequestParam(required = false) Long safraId) {
        return ResponseEntity.ok(service.getCustosPorCategoria(safraId));
    }

    @GetMapping("/custos-por-safra")
    public ResponseEntity<List<CustoPorSafraDTO>> getCustosPorSafra() {
        return ResponseEntity.ok(service.getCustosPorSafra());
    }

    @GetMapping("/evolucao-mensal")
    public ResponseEntity<List<CustoEvolucaoMensalDTO>> getEvolucaoMensal() {
        return ResponseEntity.ok(service.getEvolucaoMensal());
    }
}