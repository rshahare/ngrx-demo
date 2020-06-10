import { Employee } from 'src/app/models/Employee';
import { Action } from '@ngrx/store';

import * as EmployeeActionsSet from './employee.actions';

// When we add more elements in the initial state it is difficult to change it's defination
// everywhere the project so defining the type
export interface State {
    employees: Employee[]
}

/*
const initialState: State = {
    employees: []
};
*/
const initialState: State = {
    employees: [
        {
            "id": "1",
            "firstname": "Shahrukh",
            "lastname": "Khan",
            "age": 51,
            "designation": "CEO, Chilly International"
        },
        {
            "id": "2",
            "firstname": "Amitabh",
            "lastname": "Bachhan",
            "age": 71,
            "designation": "Actor"
        }
    ]
};

// Action has type and payload
// You cant directly assign the new state as state is immutable
// so you need to copy old state and return the new one...( you can override )
// export function EmployeeReducer( state: State = initialState, action: Action ) { }

export function EmployeeReducer(
    state: State = initialState,
    action: EmployeeActionsSet.EmployeeActions // union of all actions might be any action
) {

    switch( action.type ) {
        case EmployeeActionsSet.ADD_EMPLOYEE :
            return {
                ...state,
                employees: [...state.employees, action.payload]
            };

        case EmployeeActionsSet.UPDATE_EMPLOYEE :
            const employeeToUpdate = state.employees[action.payload.index];
            console.log( 'employee to update', employeeToUpdate );
            const updatedEmployee = {
                ...employeeToUpdate,
                ...action.payload.employee
            };

            console.log( 'updated employee', updatedEmployee );

            const updatedEmployees = [...state.employees];
            updatedEmployees[action.payload.index] = updatedEmployee;

            return {
                ...state,
                employees: updatedEmployees
            };

        case EmployeeActionsSet.DELETE_EMPLOYEE :

            return {
                ...state,
                employees: state.employees.filter((emp, empIndex) => {
                  return emp.id !== action.payload;
                }),
            };

        default :
            return state;
    }
}