import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

@Injectable()
export class AuthService {
    // static $inject = ['$location'];

    constructor(
        private $location: Location
    ) { }

    roles: string[] = [];

    setRoles(userRoles: string[]) {
        this.roles = userRoles;
    }

    getRoles() {
        return this.roles;
    }

    clearRoles() {
        this.roles = [];
    }

    hasRole(role: string) {
        return this.roles.indexOf(role) !== -1;
    }

    // roleRouter(role: string, route: string) {
    //     if(this.hasRole(role)){
    //         return route;
    //     }
    //     return '/';
    // }
} 