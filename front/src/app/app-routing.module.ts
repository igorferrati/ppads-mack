import { AlunosModule } from './alunos/alunos.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './authentication/guard/auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [authGuard],
  },
  {
    path: 'professores',
    loadChildren: () =>
      import('./professores/professores.module').then(
        (m) => m.ProfessoresModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'responsaveis',
    loadChildren: () =>
      import('./pais/pais.module').then(
        (m) => m.PaisModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'alunos',
    loadChildren: () =>
      import('./alunos/alunos.module').then((m) => m.AlunosModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
