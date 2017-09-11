export interface IMovie {
    id:number;
    name: string;
    category: string;
}


export class IMovieClass {

    id:number;
    name: string;
    category: string;

    constructor(_id:number, _name: string, _category: string) {
        this.id = _id;
        this.name = _name;
        this.category = _category;
    }
}
