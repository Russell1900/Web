package com.web.OTS.Controllers;

import com.web.OTS.InterDomain.AdminTam;
import com.web.OTS.InterDomain.BaseUser;
import com.web.OTS.InterDomain.TamUser;
import com.web.OTS.Repository.TamRepository;
import com.web.OTS.Repository.UserRepository;
import com.web.OTS.domain.TAM;
import com.web.OTS.domain.USER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TamController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TamRepository tamRepository;

    @CrossOrigin
    @PostMapping(value = "/addTam")
    public AdminTam addTam(@RequestBody TAM tam){
        try{
            String EID = tam.getAdmin().getEid();
            if(EID.equals(""))
            {
                tam.setAdmin(null);
            }
            if(tam.getAdmin() != null)
            {
                USER user = userRepository.findByEid(EID).get(0);
                tam.appendUsers(user);
                tam.setAdmin(user);
            }

            tam = tamRepository.save(tam);
            List<TAM> tams= tamRepository.findById(tam.getId());
            TAM newtam = tams.get(0);
            AdminTam admintam = new AdminTam(newtam);
            return admintam;
        }catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }

    }

    @CrossOrigin
    @PostMapping(value = "/displayAllTam")
    public List<AdminTam> displayAllTam(){

        List<AdminTam> admintams = new ArrayList<AdminTam>();
        List<TAM> tamR =  tamRepository.findAll();
        if((tamR ==null)||tamR.isEmpty())
        {
            return null;
        }
        for (TAM tam : tamR)
        {
            admintams.add(new AdminTam(tam));
        }

        return admintams;
    }

    @CrossOrigin
    @PostMapping(value = "/addTamUser")
    public TamUser addTamUser(@RequestBody TamUser tamuser){
        try{
            TAM tam = tamRepository.findById(tamuser.getTam().getId()).get(0);

            for(BaseUser baseuser : tamuser.getUsers())
            {
                USER user = userRepository.findByEid(baseuser.getEid()).get(0);
                tam.appendUsers(user);
            }

            TAM tamR = tamRepository.save(tam);

            TamUser tur = new TamUser(tamR,tamR.getUsers());
            return tur;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @CrossOrigin
    @PostMapping(value = "/deleteTam")
    public void deleteTam(@RequestParam("id") Integer id){

        tamRepository.delete(id);
    }
}
