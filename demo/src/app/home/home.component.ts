import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee/employee.service';
import { TextService } from '../text.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  color:any= 'yellow';
  constructor(public EmployeeService: EmployeeService, public TextService: TextService) {
    TextService.guild = "home";
    
   }

  ngOnInit(): void {
    this.EmployeeService.getEmployees().subscribe();
  }

}
