package com.web.OTS.Controllers;

import com.web.OTS.domain.TestClass;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {

    @CrossOrigin
    @RequestMapping(value="/hello", method = RequestMethod.POST)
    public TestClass test(@RequestBody TestClass TC){
        return TC;
    }

    @CrossOrigin
    @RequestMapping(value="/add", method = RequestMethod.POST)
    public List<TestClass> add(@RequestBody List<TestClass> TCs){
        return TCs;
    }

    @CrossOrigin
    @RequestMapping(value="/test", method = RequestMethod.POST)
    public List<TestClass> add(){
        List<TestClass> TCs = new ArrayList<TestClass>();

        TCs.add(new TestClass(1,"a"));
        TCs.add(new TestClass(2,"b"));
        TCs.add(new TestClass(3,"c"));
        TCs.add(new TestClass(4,"d"));

        return TCs;
    }
}
