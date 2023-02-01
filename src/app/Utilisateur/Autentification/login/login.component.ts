import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {LocalStorageService} from "../../../service/local-storage.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  email: string= '';
  password: string='';
  registerForm!: FormGroup;
  submitted = false;


  constructor(private userservice: AuthService,private formBuilder: FormBuilder,private route:Router,private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({

      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.minLength(6)]],
    })
  }
  // pour acceder aux champs des formulaires
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stopper si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }
    else{
      this.login();

    }
  }

  login() {


    this.userservice.login(this.email, this.password).subscribe(data => {
       if (data != null) {

        this.localStorageService.setItem("user_connecte", JSON.stringify(data));
        alert("connexion réussite");
        this.route.navigate(["/"])
      }

      //Probleme de connexion
      else {

        this.userservice.doesEmailExist(this.email).subscribe(
          message => {
            if (message) {
              alert("mot de passe incorrect")
            } else {
              alert("utilisateur inexistant")
            }

          })
      }
    })

  }



  //Si on annulle l inscription on va vider les champs
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}

