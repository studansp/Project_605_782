package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventSectionController extends ControllerBase {
    @RequestMapping(path="/eventsection", method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get(@RequestParam(value="id") int id) {
        return null;
    }
}