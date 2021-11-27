import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(public formBuilder:FormBuilder)
  {

  }
  get f() { return this.registerForm.controls; }
  reset()
  {
    this.registerForm.reset();
      this.registerForm.get('name').clearValidators();
      this.registerForm.get('name').updateValueAndValidity();
      this.registerForm.get('email').clearValidators();
      this.registerForm.get('email').updateValueAndValidity();
      this.registerForm.get('phone').clearValidators();
      this.registerForm.get('phone').updateValueAndValidity();
  }
  //Form Submit Function
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {

      return;
    }
    else {
      // Form success submition. THis will reset form and form validations
      this.registerForm.reset();
      this.registerForm.get('name').clearValidators();
      this.registerForm.get('name').updateValueAndValidity();
      this.registerForm.get('email').clearValidators();
      this.registerForm.get('email').updateValueAndValidity();
      this.registerForm.get('phone').clearValidators();
      this.registerForm.get('phone').updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    // Form set Validations
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}