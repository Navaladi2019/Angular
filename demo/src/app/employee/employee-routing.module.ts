import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';




// All the routes in the angular module that you want to lazy load should have the same route prefix
// The module should not be referenced in any other module.If it is referenced,
//  the module loader will eagerly load it instead of lazily loading it.
const routes: Routes = [
   {path:"employees", children:[

    // since we are moving it to the children of parent all the child route shoul have the prefix of employees.
       { path: "", component: ListEmployeeComponent },
       { path: "Create", component: CreateEmployeeComponent },
       { path: 'edit/:id', component: CreateEmployeeComponent },
]}
 
    
];

@NgModule({

    // difference between routermodule.ForRoot and ForChild is for root creates & registers RouterService instance in dependency injection
    // where as forchild takes the instance registered in Dependency injection and adds the route in it. Forchild will not create router service instance in dependency injection
    //, it takes the existing instance and adds the route to it.
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
