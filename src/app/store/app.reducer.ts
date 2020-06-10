import { ActionReducerMap } from '@ngrx/store';

import * as fromEmployee from '../components/store/employee.reducer';
//import * as fromAuth from '../components/store/auth.reducer';

export interface AppState {
  employees: fromEmployee.State;
  //auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  employees: fromEmployee.EmployeeReducer,
  //auth: fromAuth.authReducer
};
