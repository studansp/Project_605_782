package com.columbustheater.viewmodels;

public class Response<T> {
    public Response() {

    }

    public Response(T model) {
        this.model = model;
        this.status = 200;
    }

    private int status;
    private String message;
    private T model;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

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
