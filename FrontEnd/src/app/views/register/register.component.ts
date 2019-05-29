import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/service/authentication.service';
import { Router } from '@angular/router';
import { Employee } from '../../shared/models/Employee';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private registerService: AuthenticationService,
              private router:Router) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username:['',[Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        salary:['',Validators.required],
        cnp:['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]     
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    const username=this.registerForm.get('username').value;
    const password=this.registerForm.get('password').value;
    const firstName=this.registerForm.get('firstName').value;
    const lastName=this.registerForm.get('lastName').value;
    const email=this.registerForm.get('email').value;
    const cnp=this.registerForm.get('cnp').value;
    const salary=this.registerForm.get('salary').value;

    this.registerService.register(username,password,firstName,lastName,email,cnp,salary).subscribe(user=>{
      if(user!=null){
        var empl = new Observable<Employee>();
        empl=this.registerService.login(username,password);
        this.router.navigate(['/dashboard']);
      }
    })
  
}

}
