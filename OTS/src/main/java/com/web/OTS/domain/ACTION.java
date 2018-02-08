package com.web.OTS.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class ACTION {

    @Id
    @GeneratedValue
    private Integer id;

    @NotNull
    private String title;

    @NotNull
    private String status;

    private Date duedate;

    @ManyToOne
    @JoinColumn(name = "usereid")
    private USER user;

    @ManyToOne
    @JoinColumn(name = "tamidstat")
    private TAM tam;

    public ACTION() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDuedate() {
        return duedate;
    }

    public void setDuedate(Date duedate) {
        this.duedate = duedate;
    }

    public USER getUser() {
        return user;
    }

    public void setUser(USER user) {
        this.user = user;
    }

    public TAM getTam() {
        return tam;
    }

    public void setTam(TAM tam) {
        this.tam = tam;
    }
}
