import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from './customer.service';
import { ICustomer } from './ICustomer';
import { ICustomerClass } from './ICustomer';



@Component({
    selector: 'customer',
    templateUrl: `./customer.component.html`,
    providers: [CustomerService]
})

export class CustomerComponent {
    arSubscriptions:string[] = ['Monthly', 'Quarterly', 'Monthly', 'pay as you go'];
    arCustomers: ICustomer[];
    boolAddCustomer: boolean = false;
    boolEditCustomer: boolean = false;
    boolCustomerTable: boolean = true;
    idDisabled: boolean = true;


    private customerId: number;
    private name: string;
    private subscription: string;
    private age:number;
    private customer: any;

    //constructor-------------------------------------------------------------------------
    constructor(private service: CustomerService) {
        const req = this.service.Get();

        req.map(res => <ICustomer[]>res.json()).subscribe(posts => {
            this.arCustomers = posts;
            console.log(this.arCustomers);
        },
            (err) => {
                console.log("error : " + err);
            });
    }




    GetSomeCustomerId(Name: string, Age:number, Subscription: string) {
        const req = this.service.Get();

        req.map(res => <ICustomer[]>res.json()).subscribe(posts => {
            this.arCustomers = posts;
            console.log("this is arCustomers");
            console.log(this.arCustomers);

            for (let item of this.arCustomers) {
                console.log("inside the for");
                if (item.name == Name && item.age == Age && item.subscription == Subscription) {
                    console.log("inside the if");
                    this.customerId = item.id;
                    console.log(this.customerId);
                    break;
                }
            }

        },
            (err) => {
                console.log("error : " + err);
            });
    }

    AddCustomer(myNgForm: any) {
        if (myNgForm.valid) {
            this.service.addCustomer(this.name,this.age, this.subscription).subscribe(response => {

                this.GetSomeCustomerId(this.name, this.age, this.subscription);
                console.log("after the function GetSomeCustomerId");

                console.log('Response from server : ' + response);
                window.alert('The Customer: ' + this.name + ' added succefully');

                this.arCustomers.push(new ICustomerClass(this.customerId, this.name,this.age, this.subscription));
                this.boolAddCustomer = !this.boolAddCustomer;
            },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }
    }





        GetNewChangedArray() {
        const req = this.service.Get();
        req.map(res => <ICustomer[]>res.json()).subscribe(posts => {
            this.arCustomers = posts;
            console.log("this is arCustomers - new with changes");
            console.log(this.arCustomers);
            this.boolEditCustomer=!this.boolEditCustomer;
        },
            (err) => {
                console.log("error : " + err);
            });
    }


    EditCustomer(myNgForm: any) {

        if (myNgForm.valid) {
            this.service.editCustomer(this.customerId, this.name,this.age, this.subscription).subscribe(response => {

                console.log('Response from server : ' + response);
                this.GetNewChangedArray();
            },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }

    }



    //Get Customer To Delete
    GetCustomerToDelete(customer: any) {
        this.customer = customer;
    }
    // Delete The Customer
    DeleteCustomerHandler() {

        console.log(this.customer);

        this.service.deleteCustomer(this.customer).subscribe(response => {

            window.alert('The customer ' + this.customer.Name + ' was deleted succesfully');

            let index = this.arCustomers.indexOf(this.customer);
            this.arCustomers.splice(index, 1);
            console.log(this.arCustomers);
        },
            (err) => {
                console.log("error : " + err);
                window.alert(JSON.stringify(err));
            });
    }





    AddAddCustomerForm() {
        this.boolAddCustomer = !this.boolAddCustomer;
        this.name = "";
        this.age =null;
        this.subscription = "";
    }


    AddEditCustomerForm(customer: any) {
        this.boolEditCustomer = !this.boolEditCustomer;
        this.customerId = customer.Id;
        this.name = customer.Name;
        this.age - customer.Age;
        this.subscription = customer.Subscription;
    }
}