package com.web.OTS.Controllers;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.web.OTS.InterDomain.BaseTam;
import com.web.OTS.InterDomain.BaseUser;
import com.web.OTS.InterDomain.TaskUser;
import com.web.OTS.Repository.TamRepository;
import com.web.OTS.Repository.UserRepository;
import com.web.OTS.domain.TAM;
import com.web.OTS.domain.USER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TamRepository tamRepository;

    @CrossOrigin
    @PostMapping(value = "/addUser")
    public USER addUser(@RequestBody USER user){

        return userRepository.save(user);
    }

    @CrossOrigin
    @PostMapping(value = "/getUserTams")
    public List<BaseTam> getUserTams(@RequestParam("UserEID") String eid){

        List<BaseTam> basetams = new ArrayList<BaseTam>();

        List<USER> users = userRepository.findByEid(eid);

        if ((users == null)|| users.isEmpty())
        {
            return null;
        }
        Set<TAM> tams = users.get(0).getTams();
        if((tams == null) || tams.isEmpty())
        {
            return null;
        }

        for(TAM tam:tams)
        {
            basetams.add(new BaseTam(tam));
        }
        return basetams;
    }

    @CrossOrigin
    @PostMapping(value = "/displayAllUser")
    public List<BaseUser> displayAllUser(){
        List<USER> Users = userRepository.findAll();
        if (Users.isEmpty())
        {
            return null;
        }
        List<BaseUser> BaseUsers = new ArrayList<BaseUser>();
        for(USER user : Users)
        {
            BaseUsers.add(new BaseUser(user));
        }
        return BaseUsers;
    }

    @CrossOrigin
    @PostMapping(value = "/displayTamUsers")
    public List<TaskUser> displayTamUsers(@RequestParam("tamid") Integer id){
        TAM tam = tamRepository.findById(id).get(0);
        Set<USER> users =tam.getUsers();
        if (users.isEmpty())
        {
            return null;
        }
        List<TaskUser> TaskUsers = new ArrayList<TaskUser>();
        for (USER user : users)
        {
            TaskUsers.add(new TaskUser(user,tam));
        }
        return TaskUsers;
    }

    @CrossOrigin
    @PostMapping(value = "/addTamMember")
    public void addTamMember(@RequestParam("tamid") Integer id, @RequestParam("eid") String eid)
    {
        TAM tam = tamRepository.findById(id).get(0);
        USER user = userRepository.findByEid(eid).get(0);

        tam.appendUsers(user);

        tamRepository.save(tam);
    }
}
