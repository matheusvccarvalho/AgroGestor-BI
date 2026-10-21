package com.agrogestor.bi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class SafraRequestDTO {

    @NotNull(message = "O ID da propriedade é obrigatório")
    private Long propriedadeId;

    @NotBlank(message = "A cultura é obrigatória")
    private String cultura;

    @NotBlank(message = "O período é obrigatório")
    private String periodo;

    @NotNull(message = "A área plantada é obrigatória")
    @Positive(message = "A área plantada deve ser maior que zero")
    private BigDecimal areaPlantada;

    @Positive(message = "A produtividade estimada deve ser maior que zero")
    private BigDecimal produtividadeEstimada;

    @Positive(message = "O custo por hectare deve ser maior que zero")
    private BigDecimal custoPorHectare;

    // Getters e Setters
    public Long getPropriedadeId() { return propriedadeId; }
    public void setPropriedadeId(Long propriedadeId) { this.propriedadeId = propriedadeId; }

    public String getCultura() { return cultura; }
    public void setCultura(String cultura) { this.cultura = cultura; }

    public String getPeriodo() { return periodo; }
    public void setPeriodo(String periodo) { this.periodo = periodo; }

    public BigDecimal getAreaPlantada() { return areaPlantada; }
    public void setAreaPlantada(BigDecimal areaPlantada) { this.areaPlantada = areaPlantada; }

    public BigDecimal getProdutividadeEstimada() { return produtividadeEstimada; }
    public void setProdutividadeEstimada(BigDecimal produtividadeEstimada) { this.produtividadeEstimada = produtividadeEstimada; }

    public BigDecimal getCustoPorHectare() { return custoPorHectare; }
    public void setCustoPorHectare(BigDecimal custoPorHectare) { this.custoPorHectare = custoPorHectare; }
}