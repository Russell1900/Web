package com.web.OTS.Repository;

import com.web.OTS.domain.PROJECT;
import com.web.OTS.domain.TASK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<TASK,Integer> {
    List<TASK> findById(Integer id);
    List<TASK> findByProject(PROJECT project);
}
