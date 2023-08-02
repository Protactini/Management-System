import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './components/register/register.component';
import { RegisterResolver } from './resolver/register.resolver';
import { RegisterService } from './services/register.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OnBoardFirstStepComponent } from './components/on-board-first-step/on-board-first-step.component';
import { OnBoardSecondStepComponent } from './components/on-board-second-step/on-board-second-step.component';
import { OnBoardThirdStepComponent } from './components/on-board-third-step/on-board-third-step.component';
import { OnBoardDoneComponent } from './components/on-board-done/on-board-done.component';
import { HRHireComponent } from './components/hrhire/hrhire.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HRHireBasicInfoComponent } from './components/hrhire/hrhire-basic-info/hrhire-basic-info.component';
import { HRHireCarVisaInfoComponent } from './components/hrhire/hrhire-car-visa-info/hrhire-car-visa-info.component';
import { HRHireContactInfoComponent } from './components/hrhire/hrhire-contact-info/hrhire-contact-info.component';
import { OnBoardComponent } from './components/on-board/on-board.component';
import { UploadPageComponent } from './components/upload-page/upload-page.component';
import { EmployeeVisaPageComponent } from './components/employee-visa-page/employee-visa-page.component';
import { HrVisaPageComponent } from './components/hr-visa-page/hr-visa-page.component';
import { LoginComponent } from './components/login/login.component';

import { AddressComponent, AddressEdit } from './components/address/address.component';
import { ContactComponent, ContactEdit } from './components/contact/contact.component';
import { DetailsComponent } from './components/details/details.component';
import { EmergencyContactComponent, EmergencyContactEdit } from './components/emergency-contact/emergency-contact.component';
import { EmployeeComponent, EmployeeEdit } from './components/employee/employee.component';
import { HrEmployeeProfileComponent } from './components/hr-employee-profile/hr-employee-profile.component';
import { HrFrontendComponent } from './components/hr-frontend/hr-frontend.component';
import { HrHireComponent } from './components/hr-hire/hr-hire.component';
import { HrHomeComponent } from './components/hr-home/hr-home.component';
import { HrVisaStatusComponent } from './components/hr-visa-status/hr-visa-status.component';
import { PersonalInformationComponent, PersonalInformationEdit } from './components/personal-information/personal-information.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { VisaStatusComponent } from './components/visa-status/visa-status.component';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { HouseComponent } from './components/house/house.component';
import { HomeComponent } from './components/home/home.component';
import {HrHomeUpload} from "./components/hr-home/hr-home.component";
import { LogOutComponent } from './log-out/log-out.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UploadPageComponent,
    EmployeeVisaPageComponent,
    HrVisaPageComponent,
    OnBoardFirstStepComponent,
    OnBoardSecondStepComponent,
    OnBoardThirdStepComponent,
    OnBoardDoneComponent,
    HRHireComponent,
    HRHireBasicInfoComponent,
    HRHireCarVisaInfoComponent,
    HRHireContactInfoComponent,

    OnBoardComponent,
    AddressComponent,
    ContactComponent,
    DetailsComponent,
    EmergencyContactComponent,
    EmployeeComponent,
    EmployeeVisaPageComponent,
    HrEmployeeProfileComponent,
    HrFrontendComponent,
    HrHireComponent,
    HrHomeComponent,
    HrVisaPageComponent,
    HrVisaStatusComponent,
    PersonalInformationComponent,
    UploadComponent,
    UploadDetailsComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadPageComponent,
    VisaStatusComponent,
    VisaStatusManagementComponent,
    HouseComponent,
    HomeComponent,
    PersonalInformationEdit,
    EmployeeEdit,
    EmergencyContactEdit,
    ContactEdit,
    AddressEdit,
    HrHomeUpload,
    LogOutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule,
    MatProgressBarModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [RegisterResolver, RegisterService],
  bootstrap: [AppComponent],
})
export class AppModule {}