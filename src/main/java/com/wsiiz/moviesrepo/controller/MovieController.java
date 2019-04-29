package com.wsiiz.moviesrepo.controller;

import com.wsiiz.moviesrepo.domain.Movie;
import com.wsiiz.moviesrepo.exception.ResourceNotFoundException;
import com.wsiiz.moviesrepo.message.request.MovieRequest;
import com.wsiiz.moviesrepo.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class MovieController {
    @Autowired
    MovieRepository movieRepository;


    @GetMapping("/movies")
    public List<Movie> getAllMovies(){
        return movieRepository.findAll();
    }

    @PostMapping("/movies")
    public void saveMovie(@RequestBody MovieRequest movieRequest){
        movieRepository.save(new Movie(movieRequest.getName(), movieRequest.getAuthor(), movieRequest.getDescription(), movieRequest.getReleaseDate(), movieRequest.getPayload()));
    }

    @GetMapping("/movies/{id}")
    public Optional<Movie> getOneMovie(@PathVariable Long id){return movieRepository.findById(id);}

    @DeleteMapping("/movies/{id}")
    public void deleteMovie(@PathVariable Long id){
        movieRepository.deleteById(id);
    }

    @PutMapping("/movies/{id}")
    public void updateMovie(@PathVariable(value = "id") Long id,
                           @RequestBody MovieRequest movieRequest) {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

        movie.setName(movieRequest.getName());
        movie.setAuthor(movieRequest.getAuthor());
        movie.setDescription(movieRequest.getDescription());
        movie.setReleaseDate(movieRequest.getReleaseDate());
        movie.setPayload(movieRequest.getPayload());

        movieRepository.save(movie);
    }
}
