import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';



export class MovieService {

    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:52272/api/Movie";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get() {
        return this.http.get(this.url);
    }


    deleteMovie(movie: any) {
        let url = this.url + "/" + movie.Id;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addMovie(name: string, category: string) {

        let url = this.url;
        let body = { Name: name, Category: category };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    editMovie(id: number, name: string, category: string) {

        let url = this.url + "/" + id;
        let body = { Id: id, Name: name, Category: category };

        return this.http.put(url, body, this.headers).map((res) => {
            return res.json();
        });
    }
}