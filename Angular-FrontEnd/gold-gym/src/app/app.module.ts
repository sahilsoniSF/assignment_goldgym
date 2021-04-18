import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MarkteamDashboardComponent } from './components/markteam-dashboard/markteam-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module'
import { RouterService } from './services/router.service';
import { CardComponent } from './components/card/card.component';
import { ProgramsService } from './services/programs.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { AllProgramsComponent } from './components/all-programs/all-programs.component';
import { CustomerEnrolledProgramsComponent } from './components/customer-enrolled-programs/customer-enrolled-programs.component';
import { EnrolledService } from './services/enrolled.service';
import { EnrolledCardsComponent } from './components/enrolled-cards/enrolled-cards.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MarkTeamHeaderComponent } from './components/mark-team-header/mark-team-header.component';
import { AdminCardsComponent } from './components/admin-cards/admin-cards.component';
import { MarkTeamCardsComponent } from './components/mark-team-cards/mark-team-cards.component';
import { EnquiriesService } from './services/enquiries.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    MarkteamDashboardComponent,
    CustomerDashboardComponent,
    HeaderComponent,
    CardComponent,
    CustomerHeaderComponent,
    AllProgramsComponent,
    CustomerEnrolledProgramsComponent,
    EnrolledCardsComponent,
    AdminHeaderComponent,
    MarkTeamHeaderComponent,
    AdminCardsComponent,
    MarkTeamCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    RouterService,
    ProgramsService,
    LoginService,
    RegisterService,
    EnrolledService,
    EnquiriesService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
