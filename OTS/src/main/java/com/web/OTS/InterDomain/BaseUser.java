package com.web.OTS.InterDomain;

import com.web.OTS.domain.USER;

public class BaseUser {
    private String eid;
    private String name;
    private String mail;

    public BaseUser() {
    }

    public BaseUser(USER user) {
        this.eid = user.getEid();
        this.name = user.getName();
        if(user.getMail() != null)
        {
            this.mail = user.getMail();
        }
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


}
