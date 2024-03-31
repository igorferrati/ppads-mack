import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private tokenService : TokenService) {}

  /**
   * Seta o usuário logado no localStorage
   * @param user
   * @returns
   */
  public setUser(user: string): void {
    return localStorage.setItem('username', user);
  }

  /**
   * Remove o token ao realizar o logout e limpa local storage no logout
   */
  public logout(): void {
    this.tokenService.deleteToken();
    this.clearLocalStorage();
  }

  /**
   * Varifica se o usuário está logado através da verificação do token
   * @returns
   */
  public isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  /**
   * Atribui nome no localStorage
   * @returns
   */
  public setName() {
    return localStorage.setItem('name', 'Adm');
  }

  /**
   * Atribui email no localStorage
   * @returns
   */
  public setEmail() {
    return localStorage.setItem('email', 'adm@gmail.com.br');
  }

  /**
   * Limpa local storage
   */

  private clearLocalStorage(): void {
    localStorage.clear();
  }

  /**
   * Remove username
   */
  public removeUsername(): void {
    localStorage.removeItem('username');
  }

  /**
   * Remove nome do localStorage
   */
  public removeName(): void {
    localStorage.removeItem('name');
  }

  /**
   * Remove email do localStorage
   */
  public removeEmail(): void {
    localStorage.removeItem('email');
  }
}
