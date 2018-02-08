package com.web.OTS.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class PROJECT {

    @Id
    @GeneratedValue
    private Integer id;

    @NotNull
    private String name;

    private Date startdate;

    private Date enddate;

    @OneToMany(mappedBy = "project")
    private Set<TASK> tasks = new HashSet<TASK>();

    @ManyToOne
    @JoinColumn(name = "tamid")
    private TAM tam;

    public PROJECT() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public Set<TASK> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TASK> tasks) {
        this.tasks = tasks;
    }

    public TAM getTam() {
        return tam;
    }

    public void setTam(TAM tam) {
        this.tam = tam;
    }
}
