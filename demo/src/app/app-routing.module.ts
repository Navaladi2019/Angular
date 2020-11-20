import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouteGuardService } from './RouteGuardService';
import { CustomPreloadingService } from '../custom-preloading.service';

const routes: Routes = [
  // home route
  { path: 'home', component: HomeComponent },
  
  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [RouteGuardService]},


  //#region  Route Guard
  //,canActivate:has a class which inherit can activate 
  // If we directly navigate to the child route, the canActivate guard will also be executed.
  // canActivateChild will always be executed while navigating to / between child routes.
  // For example, if we're at a child route child/1 and we navigate to child/2 , the guard will get executed.
 // canLoad is used to prevent the application from loading entire modules lazily if the user is not authorized to do so
  //#endregion

  { path: "employees", data: { preload: true },loadChildren: () => (import('../app/employee/employee.module').then(x => x.EmployeeModule)), canActivate: [RouteGuardService]},
  // wild card route
  { path: '**', component: PageNotFoundComponent }

  // moved the commented route to feature module
  // { path: "list", component: ListEmployeeComponent },
  // { path: "Create", component: CreateEmployeeComponent },
  // { path: 'edit/:id', component: CreateEmployeeComponent },
];

@NgModule({

  //preloadingStrategy for preloading all module
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
