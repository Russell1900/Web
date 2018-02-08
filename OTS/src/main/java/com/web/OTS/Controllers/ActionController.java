package com.web.OTS.Controllers;

import com.web.OTS.InterDomain.BaseAction;
import com.web.OTS.InterDomain.UserAction;
import com.web.OTS.Repository.ActionRepository;
import com.web.OTS.Repository.TamRepository;
import com.web.OTS.Repository.UserRepository;
import com.web.OTS.domain.ACTION;
import com.web.OTS.domain.USER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ActionController {

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private TamRepository tamRepository;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping(value = "/addAction")
    public UserAction addAction(@RequestBody ACTION Action) throws Exception
    {

        Action.setTam(tamRepository.findById(Action.getTam().getId()).get(0));
        if (Action.getUser().getEid().equals(""))
        {
            Action.setUser(null);
        }
        if(Action.getUser() != null)
        {
            Action.setUser(userRepository.findByEid(Action.getUser().getEid()).get(0));
        }

        Action = actionRepository.save(Action);

        Action = actionRepository.findById(Action.getId()).get(0);

        if(Action.getUser() == null)
        {
            USER user = new USER();
            user.setEid("");
            user.setName("");
            Action.setUser(user);
        }
        UserAction userAction =  new UserAction(Action);
        return userAction;
    }

    @CrossOrigin
    @PostMapping(value = "/displayAllAction")
    public List<UserAction> displayAllAction(@RequestParam("tamid") Integer id)
    {
        List<ACTION> actions = actionRepository.findByTam(tamRepository.findById(id).get(0));
        List<UserAction> UserActions = new ArrayList<UserAction>();

        if ((actions == null) || (actions.isEmpty()))
        {
            return null;
        }
        for(ACTION action : actions)
        {
            if(!action.getStatus().equals("Deleted"))
            {
                UserActions.add(new UserAction(action));
            }
        }
        return UserActions;
    }

    @CrossOrigin
    @PostMapping(value = "/deleteAction")
    public void deleteAction(@RequestParam("id") Integer id){

        actionRepository.delete(id);
    }

}
