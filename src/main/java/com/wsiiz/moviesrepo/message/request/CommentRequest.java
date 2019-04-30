package com.wsiiz.moviesrepo.message.request;

import lombok.Data;

@Data
public class CommentRequest {

    private String body;

    public CommentRequest(String body) {
        this.body = body;
    }
}