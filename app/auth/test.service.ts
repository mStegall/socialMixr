import { Injectable } from '@angular/core';

@Injectable()
export class TestService {
    constructor(){
        console.log('hello');
    }
    
    testFunc(){
        return 'test';
    }
}