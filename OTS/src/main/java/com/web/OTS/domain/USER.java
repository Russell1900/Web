package com.web.OTS.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class USER {

    @Id
    private String eid;

    @NotNull
    private String name;

    private String mail;

    @OneToMany(mappedBy = "user")
    private Set<ACTION> actions = new HashSet<ACTION>();

    @OneToMany(mappedBy = "user")
    private Set<TASK> tasks = new HashSet<TASK>();

    @OneToMany(mappedBy = "reviewer")
    private Set<TASK> reviewtasks = new HashSet<TASK>();

    @ManyToMany(mappedBy = "users")
    private Set<TAM> tams = new HashSet<TAM>();

    @OneToMany(mappedBy = "admin")
    private Set<TAM> admintams;

    public USER() {
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Set<ACTION> getActions() {
        return actions;
    }

    public void setActions(Set<ACTION> actions) {
        this.actions = actions;
    }

    public Set<TASK> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TASK> tasks) {
        this.tasks = tasks;
    }

    public Set<TAM> getTams() {
        return tams;
    }

    public void setTams(Set<TAM> tams) {
        this.tams = tams;
    }

    public Set<TAM> getAdmintams() {
        return admintams;
    }

    public void setAdmintams(Set<TAM> admintams) {
        this.admintams = admintams;
    }

    public Set<TASK> getReviewtasks() {
        return reviewtasks;
    }

    public void setReviewtasks(Set<TASK> reviewtasks) {
        this.reviewtasks = reviewtasks;
    }
}
