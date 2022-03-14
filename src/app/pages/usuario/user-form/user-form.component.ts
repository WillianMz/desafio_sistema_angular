import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErroServidor } from 'src/app/models/erroServidor';
import { NovoUsuarioModel } from 'src/app/models/novoUsuarioModel';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  newUser: NovoUsuarioModel;
  user: UsuarioModel;
  userID: number;
  userForm: FormGroup;
  message: string;
  success: boolean;
  erros: ErroServidor[];
  visible: boolean;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    let user = {
      Nome: '',
      CPF: '',
      Telefone: '',
      Senha:'',
      ConfirmarSenha:''
    }

    this.startForm(user);
   }

  get id(){
    return this.userForm.get('id');
  }

  get nome(){
    return this.userForm.get('nome');
  }

  get CPF(){
    return this.userForm.get('cpf');
  }

  get telefone(){
    return this.userForm.get('telefone');
  }

  get endereco(){
    return this.userForm.get('endereco');
  }

  get numero(){
    return this.userForm.get('numero');
  }

  get complemento(){
    return this.userForm.get('complemento');
  }

  get bairro(){
    return this.userForm.get('bairro');
  }

  get cidade(){
    return this.userForm.get('cidade');
  }

  get uf(){
    return this.userForm.get('estado');
  }

  get senha(){
    return this.userForm.get('senha');
  }

  get confirmarSenha(){
    return this.userForm.get('confirmarSenha');
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.userID = parseInt(id);
      this.load(this.userID);
    }
    else{
      this.visible = false;
    }
  }

  save(){
    let user = new NovoUsuarioModel();
    user.Nome = this.nome?.value;
    user.CPF = this.CPF?.value;
    user.Telefone = this.telefone?.value;
    user.Logradouro = this.endereco?.value;
    user.Numero = this.numero?.value;
    user.Complemento = this.complemento?.value;
    user.Bairro = this.bairro?.value;
    user.Cidade = this.cidade?.value;
    user.Estado = this.uf?.value;
    user.Senha = this.senha?.value;
    user.ConfirmarSenha = this.confirmarSenha?.value;

    this.userService.create(user).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message);
          this.router.navigate(['/login']);
        }
        else{
          this.showError(this.message);
        }
      },
      error: (response) => {
        this.success = response.error['success'];
        this.message = response.error['mensagem'];
        this.erros = response.error['dados'];
        this.showError(this.message,'Erro');
      }
    })
  }

  private load(userId: number) {
    this.userService.getById(userId).subscribe({
      next: (response) => {
        this.success = response['sucesso'];
        this.message = response['mensagem'];

        if(this.success == true){
          this.showSuccess(this.message);
          this.user = response['dados'];
        }
        else{
          this.showError(this.message);
        }
      },
      error: (response) => {
        this.success = response.error['success'];
        this.message = response.error['mensagem'];
        this.erros = response.error['dados'];
        this.showError(this.message,'Erro');
      }
    })
  }

  private showSuccess(message: string, title?: string){
    this.toastr.success(message, title);
  }

  private showError(message: string, title?: string){
    this.toastr.error(message, title);
  }

  private startForm(user: NovoUsuarioModel){
    this.userForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(user.Nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      cpf: new FormControl(user.CPF, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      telefone: new FormControl(user.Telefone),
      endereco: new FormControl(user.Logradouro),
      numero: new FormControl(user.Numero),
      complemento: new FormControl(user.Complemento),
      bairro: new FormControl(user.Bairro),
      cidade: new FormControl(user.Cidade),
      estado: new FormControl(user.Estado, [
        Validators.minLength(2),
        Validators.maxLength(2)
      ]),
      senha: new FormControl(user.Senha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      confirmarSenha: new FormControl(user.ConfirmarSenha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

}
