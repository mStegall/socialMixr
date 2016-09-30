import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class DrinkService {

    constructor(
        private http: Http
    ) { }

    getDrinks(): Observable<any> {
        return this.http.get('api/drinks')
            .map((res: Response) => res.json());
    }

    getTypes(): Observable<any> {
        return this.http.get('api/drinkTypes')
            .map((res: Response) => res.json());
    }

    getSubtypes(): Observable<any> {
        return this.http.get('api/drinkSubtypes')
            .map((res: Response) => res.json());
    }

    getCategories(): Observable<any> {
        return this.http.get('api/drinkCategories')
            .map((res: Response) => res.json());
    }

    getDrinksByCategory(category): Observable<any> {
        return this.http.get(`api/drinks/${category}`)
            .map((res: Response) => res.json());
    }

    addDrink(drink): Observable<any> {
        return this.http.post('api/drink', { drink })
            .map((res: Response) => res.json());
    }

    getDrink(id): Observable<any> {
        return this.http.get(`api/drink/${id}`)
            .map((res: Response) => res.json());
    }

    // deleteDrink(drinkId): Observable<any> {
    //     return this.http.get('api/drinkCategories')
    //         .map((res: Response) => res.json());
    //     // return this.$resource('/api/deleteDrink/').save({ id: drinkId });
    // }

    // updateDrink(drink): Observable<any> {
    //     return this.http.get('api/drinkCategories')
    //         .map((res: Response) => res.json());
    //     // return this.$resource('/api/updateDrink').save(drink);
    // }
}