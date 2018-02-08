package com.web.OTS.InterDomain;

import com.web.OTS.domain.PROJECT;

import java.util.Date;

public class BaseProject {

    private Integer id;

    private String name;

    private Date startdate;

    private Date enddate;

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

    public BaseProject(PROJECT project) {
        this.id = project.getId();
        this.name = project.getName();
        this.startdate = project.getStartdate();
        this.enddate = project.getEnddate();
    }

    public BaseProject() {
    }
}
