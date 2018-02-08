package com.web.OTS.InterDomain;

import com.web.OTS.domain.TAM;

public class AdminTam extends BaseTam{

    protected BaseUser admin;

    public AdminTam(TAM tam) {
        this.id = tam.getId();
        this.name = tam.getName();
        this.type = tam.getType();
        if(tam.getAdmin() != null)
        {
            this.admin = new BaseUser(tam.getAdmin());
        }
    }

    public BaseUser getAdmin() {
        return admin;
    }

    public void setAdmin(BaseUser admin) {
        this.admin = admin;
    }
}
