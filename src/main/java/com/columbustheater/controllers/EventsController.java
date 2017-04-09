package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventsController {

    @RequestMapping(path="/events", method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get() {
        return null;
    }
}
