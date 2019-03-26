import { AuthenticateService } from './../../services/authenticate/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Un email est requis.' },
      { type: 'pattern', message: 'Rentrez un email valide.' }
    ],
    'password': [
      { type: 'required', message: 'Un mot de passe est requis.' },
      { type: 'minlength', message: 'Le mot de passe doit au moins faire 5 caractères.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Votre compte a été créé. Veuillez vous connecter.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 

}
