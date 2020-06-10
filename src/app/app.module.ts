import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputTextModule} from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeedetailComponent } from './components/employeedetail/employeedetail.component';
import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { EditemployeeComponent } from './components/editemployee/editemployee.component';
import { EmployeeListComponent } from './components/employeelist/employeelist.component';

import { FormsModule } from '@angular/forms';

import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    EmployeedetailComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    PanelModule,
    CardModule,
    InputTextModule,
    AppRoutingModule,
    //StoreModule.forRoot({employees:EmployeeReducer})
    StoreModule.forRoot(fromApp.appReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
