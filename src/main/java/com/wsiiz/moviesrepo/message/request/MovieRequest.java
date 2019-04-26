package com.wsiiz.moviesrepo.message.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class MovieRequest {
    private String name;
    private String author;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date releaseDate;
    private String payload;

    public MovieRequest(String name, String author, String description, Date releaseDate, String payload) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.releaseDate = releaseDate;
        this.payload = payload;
    }

}
