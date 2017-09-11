export interface IRental {
    id:number;
    customerId: number;
    movieId: number;
}


export class IRentalClass {

    id:number;
    customerId: number;
    movieId: number;

    constructor(_id:number, _customerId: number, _movieId: number) {
        this.id = _id;
        this.customerId = _customerId;
        this.movieId = _movieId;
    }
}
