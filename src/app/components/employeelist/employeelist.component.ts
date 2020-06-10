import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/Employee';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
// you can import state and use it
import * as fromEmployee from '../store/employee.reducer'; // from syntaxt for reducer


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html'
})
export class EmployeeListComponent implements OnInit {
  _listFilterBy: string;
  allEmployees: Employee[];
  filteredList: Employee[];

  //loadedEmployees$: Observable<{ employees:Employee[]}>;
  loadedEmployees$: Observable<fromEmployee.State>;
  private loadedEmployeesSub: Subscription;

  // Service injected in constructor
  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    //private store : Store<{ employer : {employers:Employer[]} }>
    private store : Store<fromApp.AppState>

  ) { }

  // Gets filter by value from the search box
  get listFilterBy(): string {
    return this._listFilterBy;
  }

  // Sets filter by value from the search box
  set listFilterBy(value: string) {
    this._listFilterBy = value;
    this.filteredList = this._listFilterBy ? this.performFilter(this._listFilterBy) : this.allEmployees;
  }

  // Method to filter the employees on basis of filter by value
  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allEmployees.filter((employee: Employee) => employee.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
     employee.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // Initializes all employees list from employee service
  ngOnInit() {

    // Way 1 : To collect all employees from employeeService
    //this.allEmployees = this.employeeService.getAllEmployees();

    // Way 2 : To collect all employees using ngRx Store
    this.loadedEmployees$ = this.store.select('employees');
    this.loadedEmployeesSub = this.loadedEmployees$.subscribe(
      employees => {
        this.allEmployees = employees.employees;
        console.log( this.allEmployees );
      }
    );

    this.filteredList = this.allEmployees;
    this._listFilterBy = "";
  }

  // Method to add an employee to the list
  addEmployee(){
    this.router.navigate(["AddEmployee"]);
  }

  // Method to refresh the employee list after successful delete
  refreshList(){
    // Way 1 : to get the latest all employees
    //this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
  }

  ngOnDestroy() {
    this.loadedEmployeesSub.unsubscribe();
  }
}
