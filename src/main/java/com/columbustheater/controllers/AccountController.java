package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {
    private static final String path="/account";

    @RequestMapping(path=path, method = RequestMethod.POST)
    @ResponseBody
    public Response<String> create(@RequestBody Object account) {
        return null;
    }

    @RequestMapping(path=path, method = RequestMethod.PUT)
    @ResponseBody
    public Response<String> update(@RequestBody Object account) {
        return null;
    }

    @RequestMapping(path=path, method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get(@RequestParam(value="id") int id) {
        return null;
    }
}
