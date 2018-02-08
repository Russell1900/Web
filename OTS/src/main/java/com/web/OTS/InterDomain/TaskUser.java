package com.web.OTS.InterDomain;

import com.web.OTS.domain.PROJECT;
import com.web.OTS.domain.TAM;
import com.web.OTS.domain.TASK;
import com.web.OTS.domain.USER;

public class TaskUser extends BaseUser{
    Integer total;
    Integer done;
    Integer pending;

    public TaskUser() {
    }

    public TaskUser(USER user, TAM tam) {

        super(user);
        this.total = 0;
        this.done = 0;
        this.pending = 0;
        for (PROJECT project : tam.getProjects())
        {
            for(TASK task : user.getTasks())
            {
                if (task.getProject().getId().equals(project.getId()))
                {
                    if(!task.getStatus().equals("Deleted"))
                    {
                        this.total++;
                    }
                    if(task.getStatus().equals("Done") || task.getStatus().equals("Dev Complete") || task.getStatus().equals("Review"))
                    {
                        this.done++;
                    }
                    else if(task.getStatus().equals("Pending"))
                    {
                        this.pending++;
                    }
                }
            }

            for(TASK task : user.getReviewtasks())
            {
                if (task.getProject().getId().equals(project.getId()))
                {
                    if(!task.getStatus().equals("Deleted"))
                    {
                        this.total++;
                    }
                    if(task.getStatus().equals("Done"))
                    {
                        this.done++;
                    }
                }
            }
        }
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getDone() {
        return done;
    }

    public void setDone(Integer done) {
        this.done = done;
    }

    public Integer getPending() {
        return pending;
    }

    public void setPending(Integer pending) {
        this.pending = pending;
    }
}
