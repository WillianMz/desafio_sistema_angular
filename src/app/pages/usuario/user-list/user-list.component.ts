import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioModel } from 'src/app/models/usuarioModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UsuarioModel[];
  message: string;
  success: boolean;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  new(){
    this.router.navigate(['/usuarios/new']);
  }

  private listAll(){
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response
        console.log(response);
      },
      error: (response) => {
        this.success = response.error['success'];
        this.message = response.error['mensagem'];
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

}
