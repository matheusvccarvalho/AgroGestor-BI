package com.agrogestor.bi.dto;

import java.math.BigDecimal;

public class CustoEvolucaoMensalDTO {
    private String mesAno; // Formato "MM/yyyy"
    private BigDecimal valorTotal;

    public CustoEvolucaoMensalDTO(String mesAno, BigDecimal valorTotal) {
        this.mesAno = mesAno;
        this.valorTotal = valorTotal != null ? valorTotal : BigDecimal.ZERO;
    }

    public String getMesAno() { return mesAno; }
    public BigDecimal getValorTotal() { return valorTotal; }
}