package com.agrogestor.bi.dto;

import java.math.BigDecimal;

public class CustoPorSafraDTO {
    private Long safraId;
    private String descricaoSafra;
    private BigDecimal valorTotal;

    public CustoPorSafraDTO(Long safraId, String descricaoSafra, BigDecimal valorTotal) {
        this.safraId = safraId;
        this.descricaoSafra = descricaoSafra;
        this.valorTotal = valorTotal != null ? valorTotal : BigDecimal.ZERO;
    }

    public Long getSafraId() { return safraId; }
    public String getDescricaoSafra() { return descricaoSafra; }
    public BigDecimal getValorTotal() { return valorTotal; }
}