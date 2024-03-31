import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  // Lida os com error das requisições
  intercept(
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error has occurred';

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente, como uma rede interrompida
          errorMessage = `Client error: ${error.error.message}`;
        } else if (error.status === 404) {
          // Recurso não encontrado (erro 404)
          errorMessage = 'Resource not found';
        } else if (error.status === 500) {
          // Erro interno do servidor (erro 500)
          errorMessage = 'Internal server error';
        } else if (error.status === 401) {
          // Erro de acesso (erro 401)
          errorMessage = 'You are not authorized to access this resource';
        }

        console.error('Error HTTP:', error);
        console.error('Error message:', errorMessage);
        return throwError(() => new Error('Oops, an error occurred'));
      })
    );
  }
}
