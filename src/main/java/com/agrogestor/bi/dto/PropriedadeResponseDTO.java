
package com.agrogestor.bi.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PropriedadeResponseDTO {

    private Long id;
    private String nome;
    private String municipio;
    private String estado;
    private BigDecimal areaHectares;
    private LocalDateTime createdAt;

    public PropriedadeResponseDTO() {
    }

    public PropriedadeResponseDTO(
            Long id,
            String nome,
            String municipio,
            String estado,
            BigDecimal areaHectares,
            LocalDateTime createdAt) {

        this.id = id;
        this.nome = nome;
        this.municipio = municipio;
        this.estado = estado;
        this.areaHectares = areaHectares;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getMunicipio() {
        return municipio;
    }

    public String getEstado() {
        return estado;
    }

    public BigDecimal getAreaHectares() {
        return areaHectares;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
