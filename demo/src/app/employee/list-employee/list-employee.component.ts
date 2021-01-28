import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../IEmployee';
import { EmployeeService } from '../employee.service';
import { Route, Router } from '@angular/router';
import { TextService } from 'src/app/text.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: IEmployee[];
  constructor(private _employeeService: EmployeeService, private _router: Router, private text :TextService) {
    text.guild = "list";
console.log(text.guild);
   }

  ngOnInit():void {
    this._employeeService.getEmployees().subscribe(
      (employeeList) => this.employees = employeeList,
      (err) => console.log(err)
    );
  }

  editButtonClick(employeeId: number) {
    this._router.navigate(['/employees/edit', employeeId]);
  }
  
}
