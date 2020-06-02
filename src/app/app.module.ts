import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddnewComponent } from './addnew/addnew.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaneComponent } from './pane/pane.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitsComponent } from './units/units.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    AddnewComponent,
    LoginComponent,
    DashboardComponent,
    PaneComponent,
    UnitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
