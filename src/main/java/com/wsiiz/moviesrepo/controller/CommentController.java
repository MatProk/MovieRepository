package com.wsiiz.moviesrepo.controller;

import com.wsiiz.moviesrepo.domain.Comment;
import com.wsiiz.moviesrepo.domain.Movie;
import com.wsiiz.moviesrepo.domain.User;
import com.wsiiz.moviesrepo.repository.CommentRepository;
import com.wsiiz.moviesrepo.repository.MovieRepository;
import com.wsiiz.moviesrepo.repository.UserRepository;
import com.wsiiz.moviesrepo.security.services.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CommentController {


    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

    @GetMapping("movies/{id}/comments")
    public List<Comment> getComments(){
        return commentRepository.findAll();
    }

    @PostMapping("movies/{id}/comments")
    public void addComment(@RequestBody Comment comment, @PathVariable(value = "id") Long id, @AuthenticationPrincipal UserPrinciple userPrinciple){

        User user = userRepository.findByUsername(userPrinciple.getUsername()).get();
        Movie movie = movieRepository.getOne(id);

        commentRepository.save(new Comment(comment.getBody(), new Date(), movie, user));
    }
}
