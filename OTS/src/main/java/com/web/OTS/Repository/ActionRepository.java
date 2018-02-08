package com.web.OTS.Repository;

import com.web.OTS.domain.ACTION;
import com.web.OTS.domain.TAM;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionRepository extends JpaRepository<ACTION,Integer> {
    List<ACTION> findByTam(TAM tam);
    List<ACTION> findById(Integer id);
}
