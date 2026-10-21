package com.agrogestor.bi.service;

import com.agrogestor.bi.dto.*;
import com.agrogestor.bi.repository.CustoRepository;
import com.agrogestor.bi.repository.PropriedadeRepository;
import com.agrogestor.bi.repository.SafraRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final PropriedadeRepository propriedadeRepository;
    private final SafraRepository safraRepository;
    private final CustoRepository custoRepository;

    public DashboardService(PropriedadeRepository propriedadeRepository, 
                            SafraRepository safraRepository, 
                            CustoRepository custoRepository) {
        this.propriedadeRepository = propriedadeRepository;
        this.safraRepository = safraRepository;
        this.custoRepository = custoRepository;
    }

    @Transactional(readOnly = true)
    public DashboardResumoDTO getResumo() {
        long totalPropriedades = propriedadeRepository.count();
        long totalSafras = safraRepository.count();
        long totalCustos = custoRepository.count();
        BigDecimal valorTotal = custoRepository.somarValorTotal();
        
        return new DashboardResumoDTO(totalPropriedades, totalSafras, totalCustos, valorTotal);
    }

    @Transactional(readOnly = true)
    public List<CustoPorCategoriaDTO> getCustosPorCategoria(Long safraId) {
        List<Object[]> resultados = custoRepository.somarValorPorCategoria(safraId);
        return resultados.stream()
                .map(row -> new CustoPorCategoriaDTO((String) row[0], (BigDecimal) row[1]))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CustoPorSafraDTO> getCustosPorSafra() {
        List<Object[]> resultados = custoRepository.somarValorPorSafra();
        return resultados.stream()
                .map(row -> new CustoPorSafraDTO((Long) row[0], (String) row[1], (BigDecimal) row[2]))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CustoEvolucaoMensalDTO> getEvolucaoMensal() {
        List<Object[]> resultados = custoRepository.buscarDatasEValoresParaEvolucao();
        
        // Agrupa em memória usando Map.merge, que é a forma mais segura e legível de somar BigDecimal
        Map<YearMonth, BigDecimal> agrupado = new HashMap<>();
        for (Object[] row : resultados) {
            YearMonth mesAno = YearMonth.from((java.time.LocalDate) row[0]);
            BigDecimal valor = (BigDecimal) row[1];
            agrupado.merge(mesAno, valor, BigDecimal::add);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");
        
        return agrupado.entrySet().stream()
                .sorted(Map.Entry.comparingByKey()) // Ordena cronologicamente
                .map(entry -> new CustoEvolucaoMensalDTO(entry.getKey().format(formatter), entry.getValue()))
                .collect(Collectors.toList());
    }
}