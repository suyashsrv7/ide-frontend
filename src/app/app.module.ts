import { BrowserModule } from '@angular/platform-browser';
;
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpInterceptorService } from './http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NavComponent,
    HomeComponent,
    EditorComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // NgModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
