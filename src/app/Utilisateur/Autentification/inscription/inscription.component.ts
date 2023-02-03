import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/User";
import {Router} from "@angular/router";





@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})


export class  InscriptionComponent implements OnInit{

  user_inscrit:User=new User("","","","","","","","");

  registerForm!: FormGroup;
  submitted = false;
  villes: Array<string> = ["Agadir", "Casablanca", "Rabat", "Fes", "Tanger", "Tetouan"];
  imageSrc: string="";


  constructor(private userService :AuthService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ville: ['', Validators.required],
      tel: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      adresse: ['', [Validators.required]],
      date_de_naissance: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.comparer('password', 'confirmPassword')
    });

  }

  // pour acceder aux champs des formulaires
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stopper si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

   this.userService.register(this.user_inscrit).subscribe((response)=>console.log(response))


    //Si le fomulaire est valide

    alert('Inscription réussite!! ');
    this.route.navigate(['/login'])


  }
  //Si on annulle l inscription on va vider les champs
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
//Cette fonction permet de comparer si le mot de passe et sa confirmation sont similaires

  comparer(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }





}

