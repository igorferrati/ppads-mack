import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoDialogService,
  PoToolbarAction,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { UserService } from '../../authentication/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string = '';

  /**
   * Notificações
   */
  public readonly notificationActions: Array<PoToolbarAction> = [
    this.createNotificationAction(
      'po-icon-message',
      'Nova mensagem',
      this.openMessage.bind(this)
    ),
  ];

  /**
   * Ações do perfil
   */
  public readonly profileActions: Array<PoToolbarAction> = [
    {
      icon: 'po-icon-user',
      label: 'Dados do usuário',
      action: () => this.showUserData(),
    },
    {
      icon: 'po-icon-exit',
      label: 'Sair',
      type: 'danger',
      separator: true,
      action: () => this.logout(),
    },
  ];

  /**
   * Informações do perfil
   */
  public profile: PoToolbarProfile = {
    avatar: '',
    subtitle: '',
    title: '',
  };

  constructor(
    private poDialog: PoDialogService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setUser();
  }

  /**
   * Seta o usuário
   */
  private setUser(): void {
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    this.profile.subtitle = String(email);
    this.profile.title = String(name);
    this.profile.avatar = '../../assets/images/profile.jpg';
  }

  /**
   * Abre a mensagem da notificaçãp
   * @param item
   */
  public openMessage(item: PoToolbarAction): void {
    this.poDialog.alert({
      title: 'Bem vindo!',
      message: 'Bem vindo à Escola Octogono!',
      ok: undefined,
    });

    item.type = 'default';
  }

  /**
   * Redireciona para os dados do usuário
   */
  public showUserData(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Realiza logout
   */
  public logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Obtêm o número de notificações
   * @returns
   */
  public getNotificationNumber(): number {
    return this.notificationActions.filter((not) => not.type === 'danger')
      .length;
  }

  /**
   * Cria mensagem de notificação
   * @param icon
   * @param label
   * @param action
   * @returns
   */
  private createNotificationAction(
    icon: string,
    label: string,
    action: (item: any) => void
  ): PoToolbarAction {
    return { icon, label, type: 'danger', action };
  }
}
