import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/Employee';

import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as EmployerActions from '../store/employee.actions';

@Component({
  templateUrl: './addemployee.component.html'
})
export class AddemployeeComponent {

  firstname:string;
  lastname:string;
  age:number;
  designation:string;
  employee: Employee;

  // Services injected in constructor
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private store : Store<fromApp.AppState>
  ) { }

  // Method to save an employee
  saveEmployee(){
    this.employee = new Employee(this.makeRandomID(), this.firstname, this.lastname, this.age, this.designation);

    // Way 1 : Add employee using the employeeService
    // this.employeeService.addEmployee(this.employee);

    // Way 2 : Add employee using the ngrx store
    this.store.dispatch( new EmployerActions.AddEmployee( this.employee ))

    this.router.navigate(["Employees"]);
  }

  // Method to cancel the add operation
  cancelEmployee(){
    this.router.navigate(["Employees"]);
  }

  // Creates random id for employee
  makeRandomID(): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
