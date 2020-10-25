import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface IAuthData {
  login: string;
  password: string;
}


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  authForm: FormGroup;

  get authData() {
    return this.authForm.value;
  }

  get formValid() {
    return this.authForm.valid;
  }

  get loginInvalid() {
    return this.authForm.get('login').touched && this.authForm.get('login').invalid;
  }
  get passwordInvalid() {
    return this.authForm.get('password').touched && this.authForm.get('password').invalid;
  }

  constructor(
    public fb: FormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authForm = this.initForm();
  }

  initForm(data: IAuthData = {login: '', password: ''}): FormGroup {
    return this.fb.group({
      login: [data.login, Validators.required],
      password: [data.password, Validators.required]
    });
  }

  enterAuthData() {
    const action = this.formValid ? 'Success!' : 'Error!';
    const message = this.formValid ? `Hello, ${this.authData.login}!` : 'Invalid data!';
    this.showSnackBar(action, message);
    if (this.formValid) {
      this.nextRoute('currency-converter');
    }
  }

  showSnackBar(action, message) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: 'auth-info-snackbar'
    });
  }

  nextRoute(path: string) {
    this.router.navigateByUrl(path).then();
  }
}
