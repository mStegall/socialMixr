import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    // static $inject = ['authService', '$resource'];

    constructor(
        private AuthService: AuthService,
        private http: Http
    ) { }

    _user: any;

    set user(user: any) {
        this._user = user;
        this.AuthService.setRoles(user.roles);
    }

    get user() {
        return this._user;
    }

    setUser(user: any) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    setUserProperty(property, value) {
        this._user[property] = value;
    }

    clearUser() {
        this.user = {};
    }

    mixedDrinks(): Observable<any> {
        return this.http.get('/data/profile/mixedDrinks')
            .map((res: Response) => res.json());
    }
}

