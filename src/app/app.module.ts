import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatListModule, MatGridListModule,MatTabsModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,MatDialogConfig, MatTab
                                  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login";



import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import { getAuthServiceConfigs } from "./socialloginConfig";
import { UserServiceService } from './services/user-service.service';

// const appRoutes: Routes = [
//   { path: 'user-detail', component: UserDetailComponent },
//   { path: 'signup',      component: SignupComponent },
//   { path: 'login',      component: LoginComponent },
// ];


@NgModule({
  entryComponents:[
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    UserDetailComponent
  ],

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    UserDetailComponent
  ],
  imports: [
    SocialLoginModule,
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } 
    // ),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatListModule, MatGridListModule,MatTabsModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    UserServiceService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
