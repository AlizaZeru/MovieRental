import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { CustomerService } from '../customer/customer.service';
import { IMovie } from '../movie/IMovie';
import { IMovieClass } from '../movie/IMovie';
import { ICustomer } from '../customer/ICustomer';
import { ICustomerClass } from '../customer/ICustomer';
import { RentalService } from './rental.service';
import { IRental } from './IRental';
import { IRentalClass } from './IRental';



@Component({
    selector: 'rental',
    templateUrl: `./rental.component.html`,
    providers: [MovieService, CustomerService, RentalService]
})

export class RentalComponent {

    private movie: number;
    private customer: number;
    private rental: any;
    private rentalId: number;

    arMovies: IMovie[];
    arCustomers: ICustomer[];
    arRentals: IRental[];

    boolAddRental: boolean = true;
    boolReturnMovie: boolean = false;

    arRentedMovies: IMovie[];
    arRentedCustomers: ICustomer[];



    //constructor---------------------------------------------------------------------------------
    constructor(private movieService: MovieService, private customerService: CustomerService,
        private RentalService: RentalService) {
        const reqRent = this.RentalService.Get();
        reqRent.map(res => <IRental[]>res.json()).subscribe(posts => {
            this.arRentals = posts;
            console.log(this.arRentals);
        },
            (err) => {
                console.log("error : " + err);
            });

        //get movies data
        const reqMovie = this.movieService.Get();
        reqMovie.map(res => <IMovie[]>res.json()).subscribe(posts => {
            this.arMovies = posts;
            console.log(this.arMovies);
        },
            (err) => {
                console.log("error : " + err);
            });

        //get customers data
        const reqCus = this.customerService.Get();
        reqCus.map(res => <ICustomer[]>res.json()).subscribe(posts => {
            this.arCustomers = posts;
            console.log(this.arCustomers);
        },
            (err) => {
                console.log("error : " + err);
            });
    }



    // Getting array of the rentals data from DB
    GetRentalDataToArray() {
        const reqRent = this.RentalService.Get();
        reqRent.map(res => <IRental[]>res.json()).subscribe(posts => {
            this.arRentals = posts;
            console.log(this.arRentals);
        },
            (err) => {
                console.log("error : " + err);
            });
    }



    AddRental(myNgForm: any) {
        if (myNgForm.valid) {
            this.RentalService.addRental(this.movie, this.customer).subscribe(response => {

                console.log('Response from server : ' + response);
                console.log("Movie successfully rented");
                window.alert("Movie successfully rented");
                this.GetRentalDataToArray();
            },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }
    }


    // Get the id of the rented movie
    GetRentalIdToDelete(myNgForm: any) {
        if (myNgForm.valid) {
            for (let rent of this.arRentals) {
                console.log("inside the for");
                if (rent.customerId == this.customer && rent.movieId == this.movie) {
                    console.log("inside the if");
                    this.rentalId = rent.id;
                    console.log(this.rentalId);
                    break;
                }
            }
        }
    }


    // Delete The Movie From Rentals
    DeleteMovieHandler() {
        this.RentalService.deleteRental(this.rentalId).subscribe(response => {
            this.GetRentalDataToArray();
            window.alert('The movie returned succesfully');
            console.log('The movie returned succesfully');
            console.log(this.arRentals);
        },
            (err) => {
                console.log("error : " + err);
                window.alert(JSON.stringify(err));
            });
    }


    AddAddRentalForm() {
        this.boolAddRental = !this.boolAddRental;
        this.boolReturnMovie = !this.boolReturnMovie;
    }


    AddReturnMovieForm(rental: any) {
        this.boolReturnMovie = !this.boolReturnMovie;
        this.boolAddRental = !this.boolAddRental;

        // for (let rent of this.arRentals) {           
        //     for (let mv of this.arMovies) {
        //         for (let cust of this.arCustomers) {
        //             console.log("inside the 2 for loop");
        //             if (rent.CustomerId == cust.Id && rent.MovieId == mv.Id) {
        //                 console.log("inside the if");
        //                 this.arRentedMovies.push(mv);
        //                 this.arRentedCustomers.push(cust);
        //                 console.log("this is arRentedCustomers: ");
        //                 console.log(this.arRentedCustomers);
        //                 console.log("this is arRentedMovies: ");
        //                 console.log(this.arRentedMovies);
        //             }
        //         }
        //     }
        // }
    }
}