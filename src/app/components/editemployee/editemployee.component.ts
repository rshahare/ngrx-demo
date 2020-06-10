import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/Employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employeeservice.service';
import { Router } from '@angular/router/';

import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as EmployeeActions from '../store/employee.actions';
import * as fromEmployee from '../store/employee.reducer'; // from syntaxt for reducer

import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './editemployee.component.html'
})
export class EditemployeeComponent implements OnInit {

  employee: Employee;
  empIndexInStore : number;

  //loadedEmployees$: Observable<{ employees:Employee[]}>;
  loadedEmployees$: Observable<fromEmployee.State>;
  private loadedEmployeesSub: Subscription;

  // Services injected in constructor
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private store : Store<fromApp.AppState>
  ) { }

  // Initializes variables
  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    // Way 1 : To get employee from the employeeService
    //this.employee = this.employeeService.getEmployee(id);

    // Way 2 : To get employee from the ngrx/store
    this.loadedEmployees$ = this.store.select('employees');
    this.loadedEmployeesSub = this.loadedEmployees$.subscribe(
      employees => {
        this.employee = { ...employees.employees.find(emp => emp.id == id )}; // need only one employee
        this.empIndexInStore = employees.employees.findIndex(emp => emp.id == id );
      }
    );
  }

  // Method to update and employee
  updateEmployee() {
    // Way 1 : to update the employee using employeeService
    //this.employeeService.updateEmployee(this.employee);
    console.log( this.employee );
    // return;
    // Way 2 : to update employee using the ngRx / store
    this.store.dispatch( new EmployeeActions.UpdateEmployee( { index: this.empIndexInStore, employee:this.employee} ) );

    this.router.navigate(["Employees"]);
  }

  // Method to cancel update employee operation
  cancelEmployee(){
    this.router.navigate(["Employees"]);
  }

  ngOnDestroy() {
    this.loadedEmployeesSub.unsubscribe();
  }
}