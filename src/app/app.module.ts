import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {RoutingModule} from './routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthFormComponent,
    CurrencyConverterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RoutingModule,
  ],
  providers: [
    MatDialog,
    MatSnackBar],
  bootstrap: [AppComponent],
})
export class AppModule { }
