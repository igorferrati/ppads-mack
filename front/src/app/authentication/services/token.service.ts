import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  /**
   * Persiste o token
   * @param token
   * @returns
   */
  public saveToken(token: string): void {
    return localStorage.setItem(KEY, token);
  }

  /**
   * Deleta o token
   */
  public deleteToken(): void {
    localStorage.removeItem(KEY);
  }

  /**
   * Retorna o token
   * @returns
   */
  public returnToken(): string {
    return localStorage.getItem(KEY) ?? '';
  }

  /**
   * Verifica se possui token
   * @returns
   */
  public hasToken(): boolean {
    return !!this.returnToken();
  }
}
