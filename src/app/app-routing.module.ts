import { UserFormComponent } from './pages/usuario/user-form/user-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'cadastro', component: UserFormComponent},
  {path:'usuarios', loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule)},
  {path:'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path:'404', component: NotFoundComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'**', redirectTo:'404'},
  {path:'home', redirectTo:'usuarios'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
