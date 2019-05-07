import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie/movie.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  info: any;
  movieArray;
 
  constructor(private movieService: MovieService, private token: TokenStorageService) { }
 
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
    };

    this.movieService.getMovies().subscribe(
      data => {
        this.movieArray = data;
        console.log(this.movieArray)
        
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }


}
