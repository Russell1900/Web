package com.web.OTS.Controllers;

import com.web.OTS.InterDomain.BaseProject;
import com.web.OTS.Repository.ProjectRepository;
import com.web.OTS.Repository.TamRepository;
import com.web.OTS.domain.PROJECT;
import com.web.OTS.domain.TAM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TamRepository tamRepository;

    @CrossOrigin
    @PostMapping(value = "/displayTamProject")
    public List<BaseProject> displayTamProject(@RequestParam("tamid") Integer id){
        TAM tam = tamRepository.findById(id).get(0);

        List<PROJECT> projects = projectRepository.findByTam(tam);
        List<BaseProject> BaseProjects = new ArrayList<BaseProject>();

        if ((projects == null) || (projects.isEmpty()))
        {
            return null;
        }

        for(PROJECT project : projects)
        {
            BaseProjects.add(new BaseProject(project));
        }

        return BaseProjects;
    }

    @CrossOrigin
    @PostMapping(value = "/addProject")
    public BaseProject addProject(@RequestBody PROJECT project)
    {

        TAM tam = tamRepository.findById(project.getTam().getId()).get(0);
        project.setTam(tam);

        if ((project.getEnddate() != null) && (project.getEnddate().equals("")))
        {
            project.setEnddate(null);
        }
        if((project.getStartdate() != null) && (project.getStartdate().equals("")))
        {
            project.setStartdate(null);
        }

        project = projectRepository.save(project);
        return new BaseProject(project);
    }
}
