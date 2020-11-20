import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    
  ],
  exports:[
    CommonModule,
    // for form  usage
    ReactiveFormsModule,
  ]
})


// shared module is registered in employee module since we want to use this feature in employee module


// The SharedModule may re -export other common angular modules, such as CommonModule, FormsModule, ReactiveFormsModule etc.
//Instead of writing the same code in every feature module to import these commonly used Angular modules we can re -export them from a SharedModule, 
//so these commonly used Angular Modules are available to all the feature modules that import this SharedModule.

// The SharedModule should not have providers.This is because, lazy loaded modules create their own branch on the Dependency Injection tree.
//As a result of this, if a lazy loaded module imports the shared module, we end up with more than one instance of the service provided by the shared module.
//.For this same reason, the SharedModule should not import or re-export modules that have providers.


// The SharedModule is then imported by all the FeatureModules where we need the shared functionality.
//The SharedModule can be imported by both - eager loaded FeatureModules as well as lazy loaded FeatureModules.

export class SharedModule { }
