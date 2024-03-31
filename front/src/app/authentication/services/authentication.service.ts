import { UserService } from './user.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  /**
   * Lógica de autenticação
   * @param username
   * @param password
   * @returns
   */
  public authenticate(username: string, password: string): boolean {
    if (!this.isValidCredentials(username, password)) {
      return false;
    }
    const authToken = this.generateToken(20);
    this.tokenService.saveToken(authToken);
    this.userService.setUser(username);
    this.userService.setName();
    this.userService.setEmail();
    return true;
  }

  /**
   * Valida o usuário e senha o login
   * @param username
   * @param password
   * @returns
   */
  private isValidCredentials(username: string, password: string): boolean {
    return username === 'admin' && password === '123';
  }

  /**
   * Gera um token aleatório
   * @param length
   * @returns
   */
  private generateToken(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  }
}
