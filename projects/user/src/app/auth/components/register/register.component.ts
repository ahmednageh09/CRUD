import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { createAccount } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;

  constructor(private fb:FormBuilder,
              private service:LoginService,
              private router:Router) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username:  ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validators:this.checkPassword})
  }

  createAccount() {
    const model: createAccount = {
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password'],
      username: this.registerForm.value['username'],
      role: 'user',
    }
    this.service.createUser(model).subscribe(res => {
      this.router.navigate(['/tasks'])
    })

  }

  checkPassword:ValidatorFn = (group:AbstractControl):ValidationErrors | null => {
    let pass = group.get("password")?.value;
    let confrimPass = group.get("confirmPassword")?.value;

    return pass === confrimPass? null: {notSame:true};
  }
}
