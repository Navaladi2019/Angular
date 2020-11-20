import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';



import { EmployeeService } from './employee/employee.service';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HighlightDirective } from 'src/Directive/highlight.directive';

//import { EmployeeModule } from './employee/employee.module';


// 1) Angular modules are decorated with @NgModule decorator
// 2) Its a mechanism to group components, directives, pipes and services that are related to feature area f application.
// 3) 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,

    

   
    HttpClientModule,

//feature Module should be imported before AppRoutingModule since  it has wildcard route we want wildcard at last in routes array,
// If not features routing module route will not be redirected
// The module should not be referenced in any other module.If it is referenced,
//  the module loader will eagerly load it instead of lazily loading it.so commenting it
 //   EmployeeModule,

    //if AppRoutingModule is imported then only we can use router outlet in appcomponenet.html
    AppRoutingModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
