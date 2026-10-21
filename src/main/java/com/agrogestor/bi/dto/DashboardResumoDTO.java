package com.agrogestor.bi.dto;

import java.math.BigDecimal;

public class DashboardResumoDTO {
    private long totalPropriedades;
    private long totalSafras;
    private long totalCustos;
    private BigDecimal valorTotalCustos;

    public DashboardResumoDTO(long totalPropriedades, long totalSafras, long totalCustos, BigDecimal valorTotalCustos) {
        this.totalPropriedades = totalPropriedades;
        this.totalSafras = totalSafras;
        this.totalCustos = totalCustos;
        this.valorTotalCustos = valorTotalCustos != null ? valorTotalCustos : BigDecimal.ZERO;
    }

    public long getTotalPropriedades() { return totalPropriedades; }
    public long getTotalSafras() { return totalSafras; }
    public long getTotalCustos() { return totalCustos; }
    public BigDecimal getValorTotalCustos() { return valorTotalCustos; }
}