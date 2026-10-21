package com.agrogestor.bi.service;

import com.agrogestor.bi.dto.SafraRequestDTO;
import com.agrogestor.bi.dto.SafraResponseDTO;
import com.agrogestor.bi.exception.RecursoNaoEncontradoException;
import com.agrogestor.bi.model.Propriedade;
import com.agrogestor.bi.model.Safra;
import com.agrogestor.bi.repository.PropriedadeRepository;
import com.agrogestor.bi.repository.SafraRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SafraService {

    private final SafraRepository safraRepository;
    private final PropriedadeRepository propriedadeRepository;

    public SafraService(SafraRepository safraRepository, PropriedadeRepository propriedadeRepository) {
        this.safraRepository = safraRepository;
        this.propriedadeRepository = propriedadeRepository;
    }

    @Transactional
    public SafraResponseDTO criar(SafraRequestDTO dto) {
        Propriedade propriedade = propriedadeRepository.findById(dto.getPropriedadeId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Propriedade não encontrada: " + dto.getPropriedadeId()));

        Safra safra = new Safra();
        safra.setPropriedade(propriedade);
        copiarDados(dto, safra);

        Safra salva = safraRepository.save(safra);
        return converterParaDTO(salva);
    }

    @Transactional(readOnly = true)
    public List<SafraResponseDTO> listarTodas() {
        return safraRepository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SafraResponseDTO> listarPorPropriedade(Long propriedadeId) {
        return safraRepository.findByPropriedadeId(propriedadeId)
                .stream()
                .map(this::converterParaDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public SafraResponseDTO buscarPorId(Long id) {
        Safra safra = buscarEntidade(id);
        return converterParaDTO(safra);
    }

    @Transactional
    public SafraResponseDTO atualizar(Long id, SafraRequestDTO dto) {
        Safra safra = buscarEntidade(id);

        if (!safra.getPropriedade().getId().equals(dto.getPropriedadeId())) {
            Propriedade propriedade = propriedadeRepository.findById(dto.getPropriedadeId())
                    .orElseThrow(() -> new RecursoNaoEncontradoException("Propriedade não encontrada: " + dto.getPropriedadeId()));
            safra.setPropriedade(propriedade);
        }

        copiarDados(dto, safra);
        Safra atualizada = safraRepository.save(safra);
        return converterParaDTO(atualizada);
    }

    @Transactional
    public void excluir(Long id) {
        Safra safra = buscarEntidade(id);
        safraRepository.delete(safra);
    }

    private Safra buscarEntidade(Long id) {
        return safraRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Safra não encontrada: " + id));
    }

    private void copiarDados(SafraRequestDTO dto, Safra safra) {
        safra.setCultura(dto.getCultura());
        safra.setPeriodo(dto.getPeriodo());
        safra.setAreaPlantada(dto.getAreaPlantada());
        safra.setProdutividadeEstimada(dto.getProdutividadeEstimada());
        safra.setCustoPorHectare(dto.getCustoPorHectare());
    }

    private SafraResponseDTO converterParaDTO(Safra safra) {
        return new SafraResponseDTO(
                safra.getId(),
                safra.getPropriedade().getId(),
                safra.getPropriedade().getNome(),
                safra.getCultura(),
                safra.getPeriodo(),
                safra.getAreaPlantada(),
                safra.getProdutividadeEstimada(),
                safra.getCustoPorHectare()
        );
    }
}