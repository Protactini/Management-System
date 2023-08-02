import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterGuard } from './guards/register.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { RegisterResolver } from './resolver/register.resolver';
import { UploadPageComponent } from './components/upload-page/upload-page.component';
import { EmployeeVisaPageComponent } from './components/employee-visa-page/employee-visa-page.component';
import { HrVisaPageComponent } from './components/hr-visa-page/hr-visa-page.component';
import { OnBoardFirstStepComponent } from './components/on-board-first-step/on-board-first-step.component';
import { OnBoardSecondStepComponent } from './components/on-board-second-step/on-board-second-step.component';
import { OnBoardThirdStepComponent } from './components/on-board-third-step/on-board-third-step.component';
import { OnBoardDoneComponent } from './components/on-board-done/on-board-done.component';
import { HRHireComponent } from './components/hrhire/hrhire.component';
import { OnBoardComponent } from './components/on-board/on-board.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

import { HrFrontendComponent } from './components/hr-frontend/hr-frontend.component';

import { DetailsComponent } from './components/details/details.component';
import { HouseComponent } from './components/house/house.component';
import { HomeComponent } from './components/home/home.component';
import { LoggedInResolver } from './resolver/logged-in.resolver';
import { HRGuard } from './guards/hr.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { LogOutComponent } from './log-out/log-out.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  // {path: "info", component: PersonalInformationComponent},
  { path: "upload", component: HouseComponent },
  { path: "hr", component: HrFrontendComponent, canActivate:[HRGuard] },
  { path: "employee", component: HomeComponent, canActivate:[EmployeeGuard],
    resolve: {
      token: LoggedInResolver,
    } 
  },
  { path: "details", component: DetailsComponent },
  { path: "employee/:id", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogOutComponent },
  { path: "onboard", component: OnBoardComponent },
  { path: "onboard/done", component: OnBoardDoneComponent },
  //{ path: "hr", children: [{ path: "hire", component: HRHireComponent }] },
  { path: "fileupload", component: UploadPageComponent },
  { path: "employeeVisa", component: EmployeeVisaPageComponent },
  { path: "hrVisa", component: HrVisaPageComponent },
  {
    path: "register",
    canActivate: [RegisterGuard],
    component: RegisterComponent,
    resolve: {
      registrationToken: RegisterResolver,
    },
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
