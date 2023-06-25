import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogInService } from 'projects/admin/src/app/auth/services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,
              private service:LogInService,
              private router:Router,
              private toastr:ToastrService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user']
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe((res:any) => {
      localStorage.setItem('token', res.token)
      this.router.navigate(['/tasks']);
      this.toastr.success('LogIn Success!', 'success');
    })
  }

}

