package com.agrogestor.bi.service;

import com.agrogestor.bi.dto.PropriedadeRequestDTO;
import com.agrogestor.bi.dto.PropriedadeResponseDTO;
import com.agrogestor.bi.exception.RecursoNaoEncontradoException;
import com.agrogestor.bi.model.Propriedade;
import com.agrogestor.bi.repository.PropriedadeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PropriedadeService {

    private final PropriedadeRepository repository;

    public PropriedadeService(PropriedadeRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public PropriedadeResponseDTO criar(PropriedadeRequestDTO dto) {
        Propriedade propriedade = new Propriedade();
        copiarDados(dto, propriedade);
        Propriedade salva = repository.save(propriedade);
        return converterParaDTO(salva);
    }

    @Transactional(readOnly = true)
    public List<PropriedadeResponseDTO> listarTodas() {
        return repository.findAll()
                .stream()
                .map(this::converterParaDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PropriedadeResponseDTO buscarPorId(Long id) {
        Propriedade propriedade = buscarEntidade(id);
        return converterParaDTO(propriedade);
    }

    @Transactional
    public PropriedadeResponseDTO atualizar(Long id, PropriedadeRequestDTO dto) {
        Propriedade propriedade = buscarEntidade(id);
        copiarDados(dto, propriedade);
        Propriedade atualizada = repository.save(propriedade);
        return converterParaDTO(atualizada);
    }

    @Transactional
    public void excluir(Long id) {
        Propriedade propriedade = buscarEntidade(id);
        repository.delete(propriedade);
    }

    private Propriedade buscarEntidade(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Propriedade não encontrada: " + id));
    }

    private void copiarDados(PropriedadeRequestDTO dto, Propriedade propriedade) {
        propriedade.setNome(dto.getNome());
        propriedade.setMunicipio(dto.getMunicipio());
        propriedade.setEstado(dto.getEstado());
        propriedade.setAreaHectares(dto.getAreaHectares());
    }

    private PropriedadeResponseDTO converterParaDTO(Propriedade propriedade) {
        return new PropriedadeResponseDTO(
                propriedade.getId(),
                propriedade.getNome(),
                propriedade.getMunicipio(),
                propriedade.getEstado(),
                propriedade.getAreaHectares(),
                propriedade.getCreatedAt()
        );
    }
}