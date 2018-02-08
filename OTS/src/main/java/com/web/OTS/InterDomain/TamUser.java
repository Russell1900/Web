package com.web.OTS.InterDomain;

import com.web.OTS.domain.TAM;
import com.web.OTS.domain.USER;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class TamUser {

    private BaseTam tam;
    private List<BaseUser> users = new ArrayList<BaseUser>();

    public TamUser() {
    }

    public TamUser(TAM tam, Set<USER> users) {
        this.tam = new BaseTam(tam);

        for(USER user : users)
        {
            this.users.add(new BaseUser(user));
        }
    }

    public BaseTam getTam() {
        return tam;
    }

    public void setTam(BaseTam tam) {
        this.tam = tam;
    }

    public List<BaseUser> getUsers() {
        return users;
    }

    public void setUsers(List<BaseUser> users) {
        this.users = users;
    }
}
