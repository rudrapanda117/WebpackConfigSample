package com.webpackconfigsample.WebpackConfigSample;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {

    @RequestMapping("/hello.htm")
    public String index() {
        return "index";
    }

    
    @RequestMapping("/hello2.htm")
    public String hello2() {
        return "hello2";
    }
}
