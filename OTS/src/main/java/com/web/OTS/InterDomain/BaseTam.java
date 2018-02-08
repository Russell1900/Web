package com.web.OTS.InterDomain;

import com.web.OTS.domain.TAM;

public class BaseTam {
    protected Integer id;
    protected String name;
    protected String type;

    public BaseTam() {
    }

    public BaseTam(TAM tam) {
        this.id = tam.getId();
        this.name = tam.getName();
        this.type = tam.getType();
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
