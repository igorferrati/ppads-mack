import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  /**
   * Verifica se o usuário está logado
   */
  if (isUserLoggedIn(userService)) {
    return true;
  } else {
    redirectToHomePage(router);
    return false;
  }
};

/**
 * Verifica se o usuário está logado
 * @param userService
 * @returns
 */
function isUserLoggedIn(userService: UserService): boolean {
  return userService.isLogged();
}

/**
 * Redireciona para a página inicial
 * @param router
 */
function redirectToHomePage(router: Router): void {
  router.navigate(['/']);
}
