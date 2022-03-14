import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErroServidor } from 'src/app/models/erroServidor';
import { NovoUsuarioModel } from 'src/app/models/novoUsuarioModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  newUser: NovoUsuarioModel;
  user: NovoUsuarioModel;
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
      nome: '',
      cpf: '',
      telefone: '',
      senha:'',
      confirmarSenha:''
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
      console.log(this.userID)
    }
    else{
      this.visible = false;
    }
  }

  save(){
    let user = new NovoUsuarioModel();
    user.nome = this.nome?.value;
    user.cpf = this.CPF?.value;
    user.telefone = this.telefone?.value;
    user.logradouro = this.endereco?.value;
    user.numero = this.numero?.value;
    user.complemento = this.complemento?.value;
    user.bairro = this.bairro?.value;
    user.cidade = this.cidade?.value;
    user.estado = this.uf?.value;
    user.senha = this.senha?.value;
    user.confirmarSenha = this.confirmarSenha?.value;

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
        this.user = response;
        this.startForm(this.user);
      },
      error: (response) => {
        console.log(response);
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
      nome: new FormControl(user.nome, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]),
      cpf: new FormControl(user.cpf, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      telefone: new FormControl(user.telefone),
      endereco: new FormControl(user.logradouro),
      numero: new FormControl(user.numero),
      complemento: new FormControl(user.complemento),
      bairro: new FormControl(user.bairro),
      cidade: new FormControl(user.cidade),
      estado: new FormControl(user.estado, [
        Validators.minLength(2),
        Validators.maxLength(2)
      ]),
      senha: new FormControl(user.senha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      confirmarSenha: new FormControl(user.confirmarSenha, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

}
