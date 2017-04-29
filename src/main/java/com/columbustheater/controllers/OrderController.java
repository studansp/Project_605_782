package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController extends ControllerBase {
    private static final String path = "/api/order";

    @RequestMapping(path=path, method = RequestMethod.POST)
    @ResponseBody
    public Response<String> create(@RequestBody Object order) {
        return null;
    }

    @RequestMapping(path=path, method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get(@RequestParam(value="id") int id) {
        return null;
    }
}
