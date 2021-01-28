import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee/employee.service';
import { TextService } from '../text.service';


// core moduele contains all singleton services or classes 
//which we do not want multiple instances when we lazy load our appliaction
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModuleModule { 

  static forRoot(): ModuleWithProviders<CoreModuleModule>{
    return {
      ngModule: CoreModuleModule,
      providers: [TextService, EmployeeService]
    }
  }

  static forChild(): ModuleWithProviders<CoreModuleModule> {
    return {
      ngModule: CoreModuleModule
    }
  }
}
