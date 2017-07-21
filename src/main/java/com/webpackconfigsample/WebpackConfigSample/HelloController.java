package com.webpackconfigsample.WebpackConfigSample;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @RequestMapping("/hello.htm")
    public String index() {
        return "index";
    }
    
    @RequestMapping("/whoami")
    @ResponseBody
    public Object whoami() {
        return "rudrasish";
    }

}
