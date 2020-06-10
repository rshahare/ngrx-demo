import { Action } from '@ngrx/store';
import { Employee } from 'src/app/models/Employee';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const ADD_EMPLOYEES = 'ADD_EMPLOYEES';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

export class AddEmployee implements Action {
    readonly type = ADD_EMPLOYEE;

    constructor(public payload: Employee) {}
}

export class AddEmployees implements Action {
    readonly type = ADD_EMPLOYEES;

    constructor(public payload: Employee[]) {}
}

export class UpdateEmployee implements Action {
    readonly type = UPDATE_EMPLOYEE;

    constructor(public payload: {index:number, employee:Employee} ) {}
}

export class DeleteEmployee implements Action {
    readonly type = DELETE_EMPLOYEE;

    constructor(public payload:string){}
}

export type EmployeeActions =
  AddEmployee
  | AddEmployees
  | UpdateEmployee
  | DeleteEmployee ;