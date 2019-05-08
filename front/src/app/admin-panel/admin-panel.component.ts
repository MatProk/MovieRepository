import { Component, OnInit } from '@angular/core';
import { MovieExample } from '../services/movie/movie.resource';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../auth/token-storage.service';
import { MovieService } from '../services/movie/movie.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private listMovies = 'http://localhost:8080';
  userInfo
  info: any;
  movieArray;
  movie = new MovieExample();
  arrMovies: string [];
  data;
  isEditing = false;

  registerForm: FormGroup;
  submitted = false;

  //displayedColumns: string[] = ['id', 'name', 'author', 'show'];
  //dataSource = new MatTableDataSource();
  searchResult;
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private token: TokenStorageService, private movieService: MovieService, private profile: UserService) { }
 
  ngOnInit() {
    this.profile.getUser().subscribe(data =>{
      this.userInfo = data;
    })
    this.movieService.getMovies().subscribe(
      data => {
        this.movieArray = data;
        console.log(this.movieArray)
        
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    this.info = {
      token: this.token.getToken(),
    };

    // this.movieService.getMovies().subscribe (res => {
    //   this.searchResult = res;
    //   this.dataSource.data = this.searchResult;
    //   this.dataSource = new MatTableDataSource(this.searchResult);
    //   this.dataSource.paginator = this.paginator;

    // });

    this.registerForm = this.formBuilder.group({
      nameControl: ['', Validators.required],
      authorControl: ['', Validators.required],
      descriptionControl: ['', [Validators.required]],
      gameModeControl: ['', [Validators.required]],
      releaseDateControl: ['', Validators.required],
  });
 }

 get f() { return this.registerForm.controls; }

 addMovie(){
    // this.submitted = true;
    // if(this.registerForm.invalid){
    //   return;
    // }
    console.log(this.movie);
    this.movieService.addMovie(this.movie).subscribe(res => {
      this.movie.name = "";
      this.movie.author = "";
      this.movie.description = "";
      this.movie.releaseDate = null;
      this.movieService.getMovies().subscribe(
        data => {
          this.movieArray = data;
          console.log(this.movieArray)
          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    })
    this.submitted = false;
  }

  // download() {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Accept', 'application/pdf');
  //   return this.http.get(this.listGames + "/raport/games", { headers: headers, responseType: 'blob' }).subscribe(
  //     data => {
  //       saveAs(data, 'book-raport.pdf')
  //     }
  //   );
  // }

  deleteMovie(id: number){
    this.movieService.deleteMovie(id).subscribe(data => {
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
    )
  }

  private imageSrc: string = '';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('Bledny format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.movie.payload = reader.result;
  }

  // updateGame(){
  //     let zmienna = this.game.id;
  //     console.log(this.game.id)
  //     this.gameService.updateGame(zmienna, this.game).subscribe(data => {
  //       this.isEditing = false;
  //       this.game.name = "";
  //       this.game.author = "";
  //       this.game.description = "";
  //       this.game.gameMode = "";
  //       this.game.releaseDate = null;
  //       this.toastr.info('Pomyslnie zaktualizowano gre', 'Sukces!');
  //       console.log("pykło");
  //     })
  // }

  // startEdit(gameId: number){
  //   this.gameService.getOneGame(gameId).subscribe(data => {
  //     console.log(data);
  //     this.game = data
  //   })
  //   this.isEditing = true;
  // }
}
