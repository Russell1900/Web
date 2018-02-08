package com.web.OTS.InterDomain;

import com.web.OTS.domain.ACTION;
import com.web.OTS.domain.TAM;
import com.web.OTS.domain.USER;

public class UserAction extends BaseAction{
    private BaseUser user;

    public UserAction() {
    }

    public UserAction(ACTION action) {
        super(action);
        if(action.getUser() != null) {
            this.user = new BaseUser(action.getUser());
        }
    }

    public BaseUser getUser() {
        return user;
    }

    public void setUser(BaseUser user) {
        this.user = user;
    }
}
