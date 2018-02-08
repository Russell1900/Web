package com.web.OTS.InterDomain;

import com.web.OTS.domain.ACTION;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BaseAction {

    protected Integer id;

    protected String title;

    protected String status;

    protected String duedate;

    public BaseAction() {
    }

    public BaseAction(ACTION action) {

        Date date;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        this.id = action.getId();
        this.title = action.getTitle();
        this.status = action.getStatus();

        date = action.getDuedate();
        if(date != null)
        {
            this.duedate = formatter.format(date);
        }
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

    public String getDuedate() {
        return duedate;
    }

    public void setDuedate(String duedate) {
        this.duedate = duedate;
    }
}
