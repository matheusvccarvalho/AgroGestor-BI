package com.agrogestor.bi.repository;

import com.agrogestor.bi.model.Safra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SafraRepository extends JpaRepository<Safra, Long> {
    List<Safra> findByPropriedadeId(Long propriedadeId);
}