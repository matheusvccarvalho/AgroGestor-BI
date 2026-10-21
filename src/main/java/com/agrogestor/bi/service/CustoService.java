package com.agrogestor.bi.service;

import com.agrogestor.bi.dto.CustoRequestDTO;
import com.agrogestor.bi.dto.CustoResponseDTO;
import com.agrogestor.bi.exception.RecursoNaoEncontradoException;
import com.agrogestor.bi.model.Custo;
import com.agrogestor.bi.model.Safra;
import com.agrogestor.bi.repository.CustoRepository;
import com.agrogestor.bi.repository.SafraRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustoService {

    private final CustoRepository custoRepository;
    private final SafraRepository safraRepository;

    public CustoService(CustoRepository custoRepository, SafraRepository safraRepository) {
        this.custoRepository = custoRepository;
        this.safraRepository = safraRepository;
    }

    @Transactional
    public CustoResponseDTO criar(CustoRequestDTO dto) {
        Safra safra = safraRepository.findById(dto.getSafraId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Safra não encontrada: " + dto.getSafraId()));

        Custo custo = new Custo();
        custo.setSafra(safra);
        copiarDados(dto, custo);

        Custo salvo = custoRepository.save(custo);
        return converterParaDTO(salvo);
    }

    @Transactional(readOnly = true)
    public List<CustoResponseDTO> listarTodas() {
        return custoRepository.findAll().stream().map(this::converterParaDTO).toList();
    }

    @Transactional(readOnly = true)
    public List<CustoResponseDTO> listarPorSafra(Long safraId) {
        // Valida se a safra existe antes de buscar
        if (!safraRepository.existsById(safraId)) {
            throw new RecursoNaoEncontradoException("Safra não encontrada: " + safraId);
        }
        return custoRepository.findBySafraId(safraId).stream().map(this::converterParaDTO).toList();
    }

    @Transactional(readOnly = true)
    public CustoResponseDTO buscarPorId(Long id) {
        Custo custo = buscarEntidade(id);
        return converterParaDTO(custo);
    }

    @Transactional
    public CustoResponseDTO atualizar(Long id, CustoRequestDTO dto) {
        Custo custo = buscarEntidade(id);

        if (!custo.getSafra().getId().equals(dto.getSafraId())) {
            Safra novaSafra = safraRepository.findById(dto.getSafraId())
                    .orElseThrow(() -> new RecursoNaoEncontradoException("Safra não encontrada: " + dto.getSafraId()));
            custo.setSafra(novaSafra);
        }

        copiarDados(dto, custo);
        Custo atualizado = custoRepository.save(custo);
        return converterParaDTO(atualizado);
    }

    @Transactional
    public void excluir(Long id) {
        Custo custo = buscarEntidade(id);
        custoRepository.delete(custo);
    }

    private Custo buscarEntidade(Long id) {
        return custoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Custo não encontrado: " + id));
    }

    private void copiarDados(CustoRequestDTO dto, Custo custo) {
        custo.setCategoria(dto.getCategoria());
        custo.setDescricao(dto.getDescricao());
        custo.setValor(dto.getValor());
        custo.setDataLancamento(dto.getDataLancamento());
    }

    private CustoResponseDTO converterParaDTO(Custo custo) {
        Safra safra = custo.getSafra();
        String safraDescricao = String.format("%s %s - %s", 
                safra.getCultura(), safra.getPeriodo(), safra.getPropriedade().getNome());

        return new CustoResponseDTO(
                custo.getId(),
                safra.getId(),
                safraDescricao,
                custo.getCategoria(),
                custo.getDescricao(),
                custo.getValor(),
                custo.getDataLancamento()
        );
    }
}