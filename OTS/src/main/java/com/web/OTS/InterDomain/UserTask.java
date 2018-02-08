package com.web.OTS.InterDomain;

import com.web.OTS.domain.TASK;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserTask {

    private Integer id;

    private String title;

    private String status;

    private Integer deveffort;

    private Integer reveffort;

    private Date startdate;

    private  String enddate;

    private Boolean issued = false;

    private String issue;

    private BaseUser user;

    private BaseUser reviewer;

    private BaseProject project;

    public UserTask() {
    }

    public UserTask(TASK task) {
        Date date;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        this.id = task.getId();
        this.title = task.getTitle();
        this.status = task.getStatus();
        this.deveffort = task.getDeveffort();
        this.reveffort = task.getReveffort();
        this.startdate = task.getStartdate();
        date = task.getEnddate();
        if(date != null)
        {
            this.enddate = formatter.format(date);
        }
        this.issued = task.getIssued();
        this.issue = task.getIssue();
        if(task.getUser() != null)
        {
            this.user = new BaseUser(task.getUser());
        }
        if(task.getReviewer() != null)
        {
            this.reviewer = new BaseUser(task.getReviewer());
        }
        this.project = new BaseProject(task.getProject());
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

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
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

    public BaseUser getUser() {
        return user;
    }

    public void setUser(BaseUser user) {
        this.user = user;
    }

    public BaseUser getReviewer() {
        return reviewer;
    }

    public void setReviewer(BaseUser reviewer) {
        this.reviewer = reviewer;
    }

    public BaseProject getProject() { return project; }

    public void setProject(BaseProject project) { this.project = project; }
}
