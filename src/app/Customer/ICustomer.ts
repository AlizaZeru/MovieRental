export interface ICustomer {
    id:number;
    age:number;
    name: string;
    subscription: string;
}


export class ICustomerClass {

    id:number;
    age:number;
    name: string;
    subscription: string;

    constructor(_id:number, _name: string, _age:number, _subscription: string) {
        this.id = _id;
        this.age = _age;
        this.name = _name;
        this.subscription = _subscription;
    }
}
