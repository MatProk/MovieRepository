package com.wsiiz.moviesrepo.service.comment;

import org.springframework.stereotype.Service;

import javax.xml.stream.events.Comment;
import java.util.List;

@Service
public interface CommentService {

        void addComment(CommentRequest commentRequest);

        List<Comment> getComments();
}
