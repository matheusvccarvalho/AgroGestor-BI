package com.agrogestor.bi.dto;

import java.math.BigDecimal;

public class CustoPorCategoriaDTO {
    private String categoria;
    private BigDecimal valorTotal;

    public CustoPorCategoriaDTO(String categoria, BigDecimal valorTotal) {
        this.categoria = categoria;
        this.valorTotal = valorTotal != null ? valorTotal : BigDecimal.ZERO;
    }

    public String getCategoria() { return categoria; }
    public BigDecimal getValorTotal() { return valorTotal; }
}