package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventController {
    @RequestMapping(path="/event", method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get(@RequestParam(value="id") int id) {
        return null;
    }
}
