import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInService } from '../../services/log-in.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,
              private service:LogInService,
              private toastr:ToastrService,
              private router:Router,) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      role: ['admin']
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe((res:any) => {
      localStorage.setItem('token', res.token)
      this.toastr.success("success", "Login Success!");
      this.router.navigate(["/tasks"]);
    })
  }


}
