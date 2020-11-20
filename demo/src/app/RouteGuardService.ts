import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

    constructor() { }

    canActivate(): boolean {


     //if your logic passes then return true else return false
     return true;

    }
}
