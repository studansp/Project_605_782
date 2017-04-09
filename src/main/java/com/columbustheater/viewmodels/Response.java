package com.columbustheater.viewmodels;

public class Response<T> {
    public Response() {

    }

    public Response(T model) {
        this.model = model;
    }

    private String message;
    private T model;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getModel() {
        return model;
    }

    public void setModel(T model) {
        this.model = model;
    }
}
