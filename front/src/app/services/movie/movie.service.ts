import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observable } from 'rxjs';
import { MovieExample } from './movie.resource';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesList = 'http://localhost:8080/movies';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
 
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  addMovie(movie: MovieExample): Observable<MovieExample> {
    return this.http.post<MovieExample>(this.moviesList, movie, this.httpOptions)
  }

  getOneMovie(movieId: number): Observable<MovieExample> {
    return this.http.get<MovieExample>(this.moviesList + '/' + movieId, this.httpOptions)
  }

  getMovies(): Observable<any> {
    return this.http.get(this.moviesList, { headers: {'Authorization': 'Bearer ' + this.tokenService.getToken()}});
  }

  deleteMovie(movieId: number){
    return this.http.delete(this.moviesList + '/' + movieId, this.httpOptions)
  }

  updateMovie(movieId: number, movie: MovieExample): Observable<MovieExample>{
    return this.http.put<MovieExample>(this.moviesList + '/' + movieId, movie, this.httpOptions)
  }
}
