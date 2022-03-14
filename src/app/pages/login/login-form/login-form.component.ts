import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: UsuarioModel;
  userLogin: Login;
  userLogged: any = {};
  loginForm: FormGroup;
  token: any;  

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let login = {usuario:'', senha:''};
    this.startForm(login);
   }

  get usuario(){
    return this.loginForm.get('usuario');
  }

  get senha(){
    return this.loginForm.get('senha');
  }

  ngOnInit(): void {
  }

  login(){
    let login = new Login();
    login.usuario = this.usuario?.value;
    login.senha = this.senha?.value;

    console.log(login);

    this.userService.login(login).subscribe({
      next: (response) => {
        this.user = response['usuario'];
        this.token = response['token'];
        console.log(this.user);
        console.log(this.token);

        if(this.user == null){
          this.showError('Usuário não encontrado!')
        }
        else{
          this.router.navigate(['/usuarios']);
        }
      }
    })
    
  }

  private startForm(login: Login){
    this.loginForm = new FormGroup({
      usuario: new FormControl(login.usuario),
      senha: new FormControl(login.senha)
    });
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

}
