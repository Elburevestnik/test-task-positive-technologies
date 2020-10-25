import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {CurrencyConverterComponent} from './currency-converter/currency-converter.component';
import {AuthFormComponent} from './auth-form/auth-form.component';


export const routes: Routes = [
  { path: '', component: AuthFormComponent},
  { path: 'currency-converter', component: CurrencyConverterComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
