import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  

  constructor(private formBuilder: FormBuilder,
              private loginService: AuthenticationService,
              private router:Router) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username:['',[Validators.required]],
        //password: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required]],
    });
      
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
  
    
    //this.loginService.login(this.loginForm.get('username').value,this.loginForm.get('password').value).subs
    this.loginService.login(this.loginForm.get('username').value,this.loginForm.get('password').value).subscribe( user => {
      if(user != null) {
          this.router.navigate(['/dashboard']);
      }
  });

}

}
