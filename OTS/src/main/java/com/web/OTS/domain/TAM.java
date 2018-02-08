package com.web.OTS.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class TAM {

    @Id
    @GeneratedValue
    private Integer id;

    @NotNull
    private String name;

    @NotNull
    private String type;

    @ManyToOne
    @JoinColumn(name = "admineid")
    private USER admin;

    @OneToMany(mappedBy = "tam")
    private Set<PROJECT> projects = new HashSet<PROJECT>();

    @ManyToMany
    @JoinTable(name = "tamuser", joinColumns = @JoinColumn(name = "tamid", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "usereid", referencedColumnName = "eid"))
    private Set<USER> users = new HashSet<USER>();

    @OneToMany(mappedBy = "tam")
    private Set<ACTION> tams = new HashSet<ACTION>();

    public TAM(){}

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public USER getAdmin() {
        return admin;
    }

    public void setAdmin(USER admin) {
        this.admin = admin;
    }

    public Set<PROJECT> getProjects() {
        return projects;
    }

    public void setProjects(Set<PROJECT> projects) {
        this.projects = projects;
    }

    public Set<USER> getUsers() {
        return users;
    }

    public void setUsers(Set<USER> users) {
        this.users = users;
    }

    public void appendUsers(USER user){
        users.add(user);
    }

    public void appendUsers(List<USER> newusers){
        for (USER user:newusers)
        {
            users.add(user);
        }
    }
}
