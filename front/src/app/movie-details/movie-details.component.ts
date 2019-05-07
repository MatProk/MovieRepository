import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  hasToken: any;
  errorinfo: string = null;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService) {

    this.route.params.subscribe(params => {
      this.movieService.getOneMovie(params['id']).subscribe(data => {
        console.log(data);
        this.movie = data})
    });
  }

  ngOnInit() {

  }

}
