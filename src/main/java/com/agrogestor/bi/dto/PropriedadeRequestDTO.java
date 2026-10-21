
package com.agrogestor.bi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class PropriedadeRequestDTO {

    @NotBlank(message = "O nome da propriedade é obrigatório")
    private String nome;

    private String municipio;

    private String estado;

    @NotNull(message = "A área em hectares é obrigatória")
    @Positive(message = "A área deve ser maior que zero")
    private BigDecimal areaHectares;

    public PropriedadeRequestDTO() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getAreaHectares() {
        return areaHectares;
    }

    public void setAreaHectares(BigDecimal areaHectares) {
        this.areaHectares = areaHectares;
    }
}
