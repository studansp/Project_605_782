package com.columbustheater.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @RequestMapping("/test")
    public String[] greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new String[]{"1", "2", name};
    }
}