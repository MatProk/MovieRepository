import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { CommentExample, MovieExample } from '../services/movie/movie.resource';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  comments: any;
  movie = new MovieExample();
  hasToken: any;
  errorinfo: string = null;
  test;
  pushComment = new CommentExample();


  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private token: TokenStorageService) {

  }

  addComment(){
    this.route.params.subscribe(params => {
      this.movieService.addComment(this.pushComment, params['id']).subscribe(data => {
        this.pushComment.body = "";
        this.route.params.subscribe(params => {
          this.movieService.getComments(params['id']).subscribe(data => {
            console.log(data);
            this.comments = data})
          }); 
      })
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieService.getOneMovie(params['id']).subscribe(data => {
        console.log(data);
        this.movie = data})
      });

      this.route.params.subscribe(params => {
        this.movieService.getComments(params['id']).subscribe(data => {
          console.log(data);
          this.comments = data})
        });
  }

}
