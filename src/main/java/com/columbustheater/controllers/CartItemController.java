package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartItemController {
    private static final String path = "/cartitem";

    @RequestMapping(path=path, method = RequestMethod.POST)
    @ResponseBody
    public Response<String> create(@RequestBody Object cartLine) {
        return null;
    }

    @RequestMapping(path=path, method = RequestMethod.DELETE)
    @ResponseBody
    public Response<String> delete(@RequestBody Integer id) {
        return null;
    }
}
