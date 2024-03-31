import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoPageEditLiterals } from '@po-ui/ng-components';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Página
  public readonly customLiterals: PoPageEditLiterals = { cancel: 'Cancelar' };
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', action: () => this.navigateTo('professores') },
      { label: 'Profile' },
    ],
  };

  // Dados do usuário
  public birthDate: Date = new Date(1943, 0, 26);
  public email: string = 'adm.sanchez@gmail.com.br';
  public genre: string = 'Male';
  public name: string = 'Rick Sanchez';
  public nationality: string = 'Brasileira';
  public userId: number = 122635;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initialize();
  }

  /**
   * Inicializa os dados da página
   */
  public initialize(): void {
    this.birthDate = new Date(1943, 0, 26);
    this.email = 'adm@gmail.com.br';
    this.genre = 'Male';
    this.name = 'Adm';
    this.nationality = 'Brasileira';
    this.userId = 122635;
  }

  /**
   * Ação de cancelar
   */
  public cancel(): void {
    this.navigateTo('professores');
    this.initialize();
  }

  /**
   * Alteração de rota
   * @param route
   */
  private navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
