package com.wsiiz.moviesrepo.repository;

import com.wsiiz.moviesrepo.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
