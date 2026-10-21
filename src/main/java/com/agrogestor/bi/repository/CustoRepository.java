package com.agrogestor.bi.repository;

import com.agrogestor.bi.model.Custo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CustoRepository extends JpaRepository<Custo, Long> {
    List<Custo> findBySafraId(Long safraId);

    @Query("SELECT COALESCE(SUM(c.valor), 0) FROM Custo c")
    BigDecimal somarValorTotal();

    @Query("SELECT c.categoria, COALESCE(SUM(c.valor), 0) FROM Custo c WHERE (:safraId IS NULL OR c.safra.id = :safraId) GROUP BY c.categoria")
    List<Object[]> somarValorPorCategoria(@Param("safraId") Long safraId);

    @Query("SELECT c.safra.id, CONCAT(c.safra.cultura, ' ', c.safra.periodo, ' - ', c.safra.propriedade.nome), COALESCE(SUM(c.valor), 0) " +
           "FROM Custo c GROUP BY c.safra.id, c.safra.cultura, c.safra.periodo, c.safra.propriedade.nome ORDER BY SUM(c.valor) DESC")
    List<Object[]> somarValorPorSafra();

    @Query("SELECT c.dataLancamento, c.valor FROM Custo c WHERE c.dataLancamento IS NOT NULL ORDER BY c.dataLancamento ASC")
    List<Object[]> buscarDatasEValoresParaEvolucao();
}