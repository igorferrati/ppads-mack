import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public name: string = ''; // Nome do usuário
  public menus: PoMenuItem[] = []; // Menus

  constructor(private router: Router) {
    this.setName();
    this.setupMenus();
  }

  ngOnInit(): void {}

  /**
   * Atribui o nome no menu do valor armazenado no localStorage
   */
  private setName(): void {
    const storedName = localStorage.getItem('name');
    this.name = storedName !== null ? String(storedName) : '';
  }

  /**
   * Cria os menus
   */
  private setupMenus(): void {
    this.menus = [
      this.createMenu('Professores', 'professores', 'po-icon po-icon-balance'),
      this.createMenu('Alunos', 'alunos', 'po-icon-users'),
      this.createMenu(
        'Responsáveis',
        'responsaveis',
        'po-icon po-icon-clock'
      ),
    ];
  }

  /**
   * Lógica da criação dos menus
   * @param label
   * @param route
   * @param icon
   * @param shortLabel
   * @returns
   */
  private createMenu(label: string, route: string, icon: string): PoMenuItem {
    return {
      label,
      action: () => this.router.navigate([route]),
      icon: `po-icon ${icon}`,
    };
  }

  /**
   * Rotas para esconder menu e toolbar
   * @returns
   */
  public shouldShowMenuAndToolbar(): boolean {
    return !this.router.url.includes('login');
  }
}
