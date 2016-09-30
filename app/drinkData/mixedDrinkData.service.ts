import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class MixedDrinkService {
    constructor(
        private http: Http
    ) { }

    addMixedDrink(drink): Observable<any> {
        return this.http.post('api/mixedDrink', {drink})
            .map((res: Response) => res.json());
    }

    getMixedDrinks(): Observable<any> {
        return this.http.get('api/mixedDrinks')
            .map((res: Response) => res.json());
    }

    getMixedDrink(id): Observable<any> {
        return this.http.get(`api/mixedDrink/${id}`)
            .map((res: Response) => res.json());
    }

}
