import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Form
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa o formulário
   */

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  /**
   * Lógica de validação do login
   * @returns
   */

  public login(): void {
    if (!this.isValidForm()) {
      this.utilService.showWarningNotification(
        'Por gentileza, entre uma senha e um usuário!'
      );
      return;
    }

    const username = this.utilService.getValueControl(
      this.loginForm,
      'username'
    );
    const password = this.utilService.getValueControl(
      this.loginForm,
      'password'
    );

    const isAuthenticated = this.authService.authenticate(username, password);

    if (isAuthenticated) {
      this.handleSuccessfulLogin();
    } else {
      this.utilService.showWarningNotification(
        'Senha ou usuário incorreto!'
      );
    }
  }

  /**
   * Lógica de successo no login
   */

  private handleSuccessfulLogin(): void {
    this.router.navigateByUrl('/professores');
    this.loginForm.reset();
  }

  /**
   * Valida o formulário
   * @returns
   */
  private isValidForm(): boolean {
    return this.loginForm.valid;
  }
}
