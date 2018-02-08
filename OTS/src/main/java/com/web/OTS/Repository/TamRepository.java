package com.web.OTS.Repository;

import com.web.OTS.domain.TAM;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TamRepository extends JpaRepository<TAM,Integer> {
    public List<TAM> findById(Integer Id);
    public List<TAM> findAll();
}
