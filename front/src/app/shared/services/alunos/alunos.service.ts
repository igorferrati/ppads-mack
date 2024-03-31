import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public obterTodosAlunos(): Observable<any> {
    const url = `${this.apiUrl}/alunos/info`;
    return this.http.get<any>(url);
  }


  public criarAluno(aluno:any): Observable<any> {
    const url = `${this.apiUrl}/alunos/cria`;
    return this.http.post<any>(url, aluno);
  }

}
