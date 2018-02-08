package com.web.OTS.Controllers;

import com.web.OTS.InterDomain.UserTask;
import com.web.OTS.Repository.ProjectRepository;
import com.web.OTS.Repository.TamRepository;
import com.web.OTS.Repository.TaskRepository;
import com.web.OTS.Repository.UserRepository;
import com.web.OTS.domain.PROJECT;
import com.web.OTS.domain.TAM;
import com.web.OTS.domain.TASK;
import com.web.OTS.domain.USER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.Table;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.ResolverStyle;
import java.util.*;

import static jdk.nashorn.internal.runtime.JSONFunctions.parse;

@RestController
public class TaskController {

    @Autowired
    private ProjectRepository ProjectRepository;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private TamRepository TamRepository;

    @Autowired
    private TaskRepository TaskRepository;

    @CrossOrigin
    @PostMapping(value = "/displayAllTask")
    public List<UserTask> TaskList(@RequestParam("tamid") Integer id){
        TAM tam = TamRepository.findById(id).get(0);
        List<UserTask> UserTasks = new ArrayList<UserTask>();
        Set<PROJECT> projects = tam.getProjects();

        if ((projects == null) || (projects.isEmpty()))
        {
            return null;
        }

        for (PROJECT project : projects)
        {
            List<TASK> tasks = TaskRepository.findByProject(project);
            if(tasks != null)
            {
                for (TASK task : tasks)
                {
                    if(!task.getStatus().equals("Deleted"))
                    {
                        UserTasks.add(new UserTask(task));
                    }
                }
            }
        }

        return UserTasks;
    }

    @CrossOrigin
    @PostMapping(value = "/addTask")
     public UserTask updateTask(@RequestBody TASK task){

        List<PROJECT> tempList = ProjectRepository.findById(task.getProject().getId());
        task.setProject(tempList.get(0));
        if(task.getUser().getEid().equals(""))
        {
            task.setUser(null);
        }
        if (task.getUser() != null)
        {
            List<USER> tempList1 = UserRepository.findByEid((task.getUser().getEid()));
            task.setUser(tempList1.get(0));
        }
        if(task.getReviewer().getEid().equals(""))
        {
            task.setReviewer(null);
        }
        if (task.getReviewer() != null)
        {
            List<USER> tempList2 = UserRepository.findByEid((task.getReviewer().getEid()));
            task.setReviewer(tempList2.get(0));
        }
        TASK taskR = TaskRepository.save(task);
        UserTask usertask = new UserTask(TaskRepository.findById(taskR.getId()).get(0));
        return usertask;
    }

    @CrossOrigin
    @PostMapping(value = "/removeTask")
    public void DeleteTask(@RequestParam("id" ) Integer id)
    {
      TaskRepository.delete(id);
    }
}
