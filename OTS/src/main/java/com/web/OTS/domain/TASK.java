package com.web.OTS.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class TASK {

    @Id
    @GeneratedValue
    private Integer id;

    @NotNull
    private String title;

    @NotNull
    private String status;

    private Integer deveffort;

    private Integer reveffort;

    private Date startdate;

    private  Date enddate;

    private Boolean issued = false;

    private String issue;

    @ManyToOne
    @JoinColumn(name = "usereid")
    private USER user;

    @ManyToOne
    @JoinColumn(name = "reviewereid")
    private USER reviewer;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "projectid")
    private PROJECT project;

    public TASK(){};

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

    public Integer getDeveffort() {
        return deveffort;
    }

    public void setDeveffort(Integer deveffort) {
        this.deveffort = deveffort;
    }

    public Integer getReveffort() {
        return reveffort;
    }

    public void setReveffort(Integer reveffort) {
        this.reveffort = reveffort;
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

    public Boolean getIssued() {
        return issued;
    }

    public void setIssued(Boolean issued) {
        this.issued = issued;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public USER getUser() {
        return user;
    }

    public void setUser(USER user) {
        this.user = user;
    }

    public PROJECT getProject() {
        return project;
    }

    public void setProject(PROJECT project) {
        this.project = project;
    }

    public USER getReviewer() {
        return reviewer;
    }

    public void setReviewer(USER reviewer) {
        this.reviewer = reviewer;
    }
}
