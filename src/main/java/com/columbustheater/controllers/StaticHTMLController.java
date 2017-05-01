package com.columbustheater.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StaticHTMLController {
    @RequestMapping({"/","/home", "/login", "/events", "/profile", "/cart", "/createaccount","/eventdetail/**","/eventedit/**"})
    public String returnAngularPage() {
        return "/index.html";
    }
}