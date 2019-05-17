package com.wsiiz.moviesrepo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "body")
    private String body;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @CreationTimestamp
    private Date createDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @NotNull
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull
    private User user;

    public Comment(String body) {
        this.body = body;
    }

    public Comment(String body, Date createDate, Movie movie, User user) {
        this.body = body;
        this.createDate = createDate;
        this.movie = movie;
        this.user = user;
    }

    public Comment(){
    }
}
