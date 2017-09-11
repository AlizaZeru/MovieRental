import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';



export class RentalService {

    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:52272/api/Rental";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get() {
        return this.http.get(this.url);
    }


    deleteRental(idRental: any) {
        let url = this.url + "/" + idRental;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addRental(movieId: number, customerId: number) {

        let url = this.url;
        let body = { MovieId: movieId, CustomerId: customerId };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    editRental(id: number, movieId: number, customerId: number) {

        let url = this.url + "/" + id;
        let body = { Id: id, MovieId: movieId, CustomerId: customerId };

        return this.http.put(url, body, this.headers).map((res) => {
            return res.json();
        });
    }
}