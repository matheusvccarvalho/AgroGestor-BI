package com.agrogestor.bi.dto;

import java.math.BigDecimal;

public class SafraResponseDTO {
    private Long id;
    private Long propriedadeId;
    private String propriedadeNome;
    private String cultura;
    private String periodo;
    private BigDecimal areaPlantada;
    private BigDecimal produtividadeEstimada;
    private BigDecimal custoPorHectare;
    private BigDecimal producaoEstimada; // Calculado: área × produtividade

    public SafraResponseDTO(Long id, Long propriedadeId, String propriedadeNome,
                           String cultura, String periodo, BigDecimal areaPlantada,
                           BigDecimal produtividadeEstimada, BigDecimal custoPorHectare) {
        this.id = id;
        this.propriedadeId = propriedadeId;
        this.propriedadeNome = propriedadeNome;
        this.cultura = cultura;
        this.periodo = periodo;
        this.areaPlantada = areaPlantada;
        this.produtividadeEstimada = produtividadeEstimada;
        this.custoPorHectare = custoPorHectare;
        
        // Calcula produção estimada em sacas
        if (produtividadeEstimada != null && areaPlantada != null) {
            this.producaoEstimada = areaPlantada.multiply(produtividadeEstimada);
        } else {
            this.producaoEstimada = null;
        }
    }

    // Getters
    public Long getId() { return id; }
    public Long getPropriedadeId() { return propriedadeId; }
    public String getPropriedadeNome() { return propriedadeNome; }
    public String getCultura() { return cultura; }
    public String getPeriodo() { return periodo; }
    public BigDecimal getAreaPlantada() { return areaPlantada; }
    public BigDecimal getProdutividadeEstimada() { return produtividadeEstimada; }
    public BigDecimal getCustoPorHectare() { return custoPorHectare; }
    public BigDecimal getProducaoEstimada() { return producaoEstimada; }
}