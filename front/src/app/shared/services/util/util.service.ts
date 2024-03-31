import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private notificationService: PoNotificationService) {}

  /**
   * Tratamento de erro na requisição da API
   * @param error
   */
  public handleApiError(error: any): void {
    console.error(error);
  }

  /**
   * Ordena array pelo Id
   * @param arr
   * @returns
   */
  public sortArrayById<T extends { id: number }>(arr: T[]): T[] {
    const compareById = (a: T, b: T) => a.id - b.id;
    arr.sort(compareById);

    return arr;
  }

  /**
   * Retorna o valor de um controle do formulário
   * @param form
   * @param control
   * @returns
   */
  public getValueControl(form: FormGroup, control: string) {
    return form.get(control)?.value;
  }

  /**
   * Mostra notificação de aviso
   * @param message
   */
  public showWarningNotification(message: string): void {
    this.notificationService.warning(message);
  }

  /**
   * Mostra notificação de successo
   * @param message
   */
  public showSuccessNotification(message: string): void {
    this.notificationService.success(message);
  }

  /**
   * Mostra notificação de erro
   * @param message
   */
  public showErrorNotification(message: string): void {
    this.notificationService.error(message);
  }
}
