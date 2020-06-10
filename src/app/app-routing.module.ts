import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { EmployeedetailComponent } from './components/employeedetail/employeedetail.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { EditemployeeComponent } from './components/editemployee/editemployee.component';
import { EmployeeListComponent } from './components/employeelist/employeelist.component';

const routes: Routes = [
  { path:"Employees", component:EmployeeListComponent },
  { path:"AddEmployee", component:AddemployeeComponent },
  { path:"EditEmployee/:id", component:EditemployeeComponent },
  { path:"**", redirectTo:'Employees' },
]

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
