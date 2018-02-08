package com.web.OTS.Repository;

import com.web.OTS.domain.PROJECT;
import com.web.OTS.domain.TAM;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<PROJECT, Integer> {
    List<PROJECT> findById(Integer id);
    List<PROJECT> findByTam(TAM tam);
}
