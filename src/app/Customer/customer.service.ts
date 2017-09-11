import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';



export class CustomerService {

    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:52272/api/Customer";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get() {
        return this.http.get(this.url);
    }


    deleteCustomer(customer: any) {
        let url = this.url + "/" + customer.Id;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addCustomer(name: string, age:number, subscription: string) {

        let url = this.url;
        let body = { Name: name, Age:age, Subscription: subscription };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    editCustomer(id: number, name: string, age:number, subscription: string) {

        let url = this.url + "/" + id;
        let body = { Id: id, Name: name, Age:age, Subscription: subscription };

        return this.http.put(url, body, this.headers).map((res) => {
            return res.json();
        });
    }
}