package com.web.OTS.Repository;

import com.web.OTS.domain.USER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<USER, String>{
    List<USER> findByEid(String eid);

}
