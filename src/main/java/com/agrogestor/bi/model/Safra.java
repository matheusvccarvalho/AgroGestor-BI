package com.agrogestor.bi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Entity
@Table(name = "safras")
public class Safra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propriedade_id", nullable = false)
    private Propriedade propriedade;

    @NotBlank(message = "A cultura é obrigatória")
    @Column(nullable = false, length = 80)
    private String cultura;

    @NotBlank(message = "O período é obrigatório")
    @Column(nullable = false, length = 20)
    private String periodo;

    @NotNull(message = "A área plantada é obrigatória")
    @Positive(message = "A área plantada deve ser maior que zero")
    @Column(name = "area_plantada", precision = 10, scale = 2, nullable = false)
    private BigDecimal areaPlantada;

    @Positive(message = "A produtividade estimada deve ser maior que zero")
    @Column(name = "produtividade_estimada", precision = 10, scale = 2)
    private BigDecimal produtividadeEstimada;

    @Positive(message = "O custo por hectare deve ser maior que zero")
    @Column(name = "custo_por_hectare", precision = 12, scale = 2)
    private BigDecimal custoPorHectare;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Propriedade getPropriedade() { return propriedade; }
    public void setPropriedade(Propriedade propriedade) { this.propriedade = propriedade; }

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