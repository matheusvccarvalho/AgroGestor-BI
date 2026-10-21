package com.agrogestor.bi.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CustoResponseDTO {
    private Long id;
    private Long safraId;
    private String safraDescricao; // Ex: "Soja 2025/2026 - Fazenda Modelo"
    private String categoria;
    private String descricao;
    private BigDecimal valor;
    private LocalDate dataLancamento;

    public CustoResponseDTO(Long id, Long safraId, String safraDescricao, String categoria, 
                            String descricao, BigDecimal valor, LocalDate dataLancamento) {
        this.id = id;
        this.safraId = safraId;
        this.safraDescricao = safraDescricao;
        this.categoria = categoria;
        this.descricao = descricao;
        this.valor = valor;
        this.dataLancamento = dataLancamento;
    }

    // Getters
    public Long getId() { return id; }
    public Long getSafraId() { return safraId; }
    public String getSafraDescricao() { return safraDescricao; }
    public String getCategoria() { return categoria; }
    public String getDescricao() { return descricao; }
    public BigDecimal getValor() { return valor; }
    public LocalDate getDataLancamento() { return dataLancamento; }
}