package com.columbustheater.controllers;

import com.columbustheater.viewmodels.Response;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController extends ControllerBase {
    @RequestMapping(path="/cart", method = RequestMethod.GET)
    @ResponseBody
    public Response<String> get() {
        return null;
    }
}