import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import { CustonPipePipe} from 'src/Pipes/custon-pipe.pipe';
import { CoreModuleModule } from '../core-module/core-module.module';
// Feature module which holds all eployee related feature

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent,
    CustonPipePipe
  ],
  imports: [

    // moved commented to shared module and we export from there
    // CommonModule,
    // // for form  usage
    // ReactiveFormsModule,
    EmployeeRoutingModule,
    SharedModule,
    CoreModuleModule
    
  ],

  // here we are exporting listemployeecomponent because if we want this to reuse in home page. But home is registered in root module. 
  // since we have imported employee module in root module by exporting istemployeecomponent we were able to access listemployeecomponent in
  // home page. We can also export other module and services
  exports: [ListEmployeeComponent,
            ReactiveFormsModule,
            SharedModule
  ]
})
export class EmployeeModule { }
