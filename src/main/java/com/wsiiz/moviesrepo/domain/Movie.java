package com.wsiiz.moviesrepo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(max = 100, min = 5)
    @Column(nullable = false)
    private String name;

    @Length(max = 100, min = 5)
    @Column(nullable = false)
    private String author;

    @Length(max = 500, min = 5)
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date releaseDate;

    @Lob
    @Column(name = "payload")
    private String payload;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.REMOVE)
    private Collection<Comment> comments;

    public Movie(String name, String author, String description, Date releaseDate, String payload) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.releaseDate = releaseDate;
        this.payload = payload;
    }

    public Movie(){

    }
}
