package com.wsiiz.moviesrepo.repository;

import com.wsiiz.moviesrepo.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
