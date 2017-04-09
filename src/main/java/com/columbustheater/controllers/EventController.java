package com.columbustheater.controllers;

import com.columbustheater.models.Event;
import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventController extends ControllerBase {
    @RequestMapping(path="/event", method = RequestMethod.GET)
    @ResponseBody
    public Response<Event> get(@RequestParam(value="id") int id) {


        return null;
    }
}
