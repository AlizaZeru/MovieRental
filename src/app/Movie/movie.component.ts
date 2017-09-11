import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from './movie.service';
import { IMovie } from './IMovie';
import { IMovieClass } from './IMovie';



@Component({
    selector: 'movie',
    templateUrl: `./movie.component.html`,
    providers: [MovieService]
})

export class MovieComponent {
    arCategorys:string[] = ['Action', 'Family', 'Comedy', 'Romance'];
    arMovies: IMovie[];
    boolAddMovie: boolean = false;
    boolEditMovie: boolean = false;
    boolMovieTable: boolean = true;
    idDisabled: boolean = true;


    private movieId: number;
    private name: string;
    private category: string;
    private movie: any;

    //constructor-------------------------------------------------------------------------
    constructor(private service: MovieService) {
        const req = this.service.Get();

        req.map(res => <IMovie[]>res.json()).subscribe(posts => {
            this.arMovies = posts;
            console.log(this.arMovies);
        },
            (err) => {
                console.log("error : " + err);
            });
    }




    GetSomeMovieId(Name: string, Category: string) {
        const req = this.service.Get();

        req.map(res => <IMovie[]>res.json()).subscribe(posts => {
            this.arMovies = posts;
            console.log("this is arMovies");
            console.log(this.arMovies);

            for (let item of this.arMovies) {
                console.log("inside the for");
                if (item.name == Name &&  item.category == Category) {
                    console.log("inside the if");
                    this.movieId = item.id;
                    console.log(this.movieId);
                    break;
                }
            }

        },
            (err) => {
                console.log("error : " + err);
            });
    }

    AddMovie(myNgForm: any) {
        if (myNgForm.valid) {
            this.service.addMovie(this.name, this.category).subscribe(response => {

                this.GetSomeMovieId(this.name, this.category);
                console.log("after the function GetSomeMovieId");

                console.log('Response from server : ' + response);
                window.alert('The Movie: ' + this.name + ' added succefully');

                this.arMovies.push(new IMovieClass(this.movieId, this.name, this.category));
                this.boolAddMovie = !this.boolAddMovie;
            },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }
    }





        GetNewChangedArray() {
        const req = this.service.Get();
        req.map(res => <IMovie[]>res.json()).subscribe(posts => {
            this.arMovies = posts;
            console.log("this is arMovies - new with changes");
            console.log(this.arMovies);
            this.boolEditMovie=!this.boolEditMovie;
        },
            (err) => {
                console.log("error : " + err);
            });
    }


    EditMovie(myNgForm: any) {

        if (myNgForm.valid) {
            this.service.editMovie(this.movieId, this.name, this.category).subscribe(response => {

                console.log('Response from server : ' + response);
                this.GetNewChangedArray();
            },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }

    }



    //Get Movie To Delete
    GetMovieToDelete(customer: any) {
        this.movie = customer;
    }
    // Delete The Movie
    DeleteMovieHandler() {

        console.log(this.movie);

        this.service.deleteMovie(this.movie).subscribe(response => {

            window.alert('The movie ' + this.movie.Name + ' was deleted succesfully');

            let index = this.arMovies.indexOf(this.movie);
            this.arMovies.splice(index, 1);
            console.log(this.arMovies);
        },
            (err) => {
                console.log("error : " + err);
                window.alert(JSON.stringify(err));
            });
    }





    AddAddMovieForm() {
        this.boolAddMovie = !this.boolAddMovie;
        this.name = "";
        this.category = "";
    }


    AddEditMovieForm(movie: any) {
        this.boolEditMovie = !this.boolEditMovie;
        this.movieId = movie.Id;
        this.name = movie.Name;
        this.category = movie.Category;
    }
}