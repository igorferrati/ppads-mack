import { Component, ViewChild } from '@angular/core';
import {
  PoModalComponent,
  PoNotificationService,
  PoTableColumn,
  PoTableLiterals,
} from '@po-ui/ng-components';
import { Subject, takeUntil } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlunosService } from '../shared/services/alunos/alunos.service';
import { UtilService } from '../shared/services/util/util.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
})
export class AlunosComponent {
  formAdicionarAluno!: FormGroup;

  public readonly pageActions = [
    {
      label: 'Novo aluno',
      icon: 'po-icon po-icon-plus',
      action: () => this.adicionarNovoAluno(),
    },
  ];

  // Form
  public searchField = new FormControl();

  // Pagina
  public readonly customLiterals: PoTableLiterals = {
    loadingData: 'Carregando dados',
    loadMoreData: 'Carregando mais dados',
  };

  // Util
  private destroy$ = new Subject<boolean>();

  // Tabela
  public listAlunos: any[] = [];
  public clonedListAlunos: any[] = [];
  public columnsAlunos: PoTableColumn[] = [];

  // Loading
  public showMoreDisabled = false;
  public isLoading = false;

  // Paginação
  public page = 1;
  public hasNext = true;

  public anos: any[] = [
    { label: '1º Ano', value: '1' },
    { label: '2º Ano', value: '2' },
    { label: '3º Ano', value: '3' },
  ];

  public turmas: any[] = [
    { label: '5A', value: 'a' },
    { label: '5B', value: 'b' },
    { label: '6A', value: 'c' },
    { label: '6B', value: 'd' },
  ];

  public disciplinas: any[] = [
    { label: 'Matemática', value: 'mat' },
    { label: 'Física', value: 'fis' },
    { label: 'Química', value: 'qui' },
    { label: 'Geografia', value: 'geo' },
    { label: 'Inglês', value: 'ing' },
    { label: 'Artes', value: 'art' },
    { label: 'Ciências', value: 'cie' },
  ];

  public alunos: any[] = [
    { label: 'João Silva', value: 'J' },
    { label: 'Maria Oliveira', value: 'M' },
    { label: 'Pedro Santos', value: 'P' },
  ];

  aluno = {
    nome_aluno: '',
    turma: '',
    responsavel: '',
  };

  constructor(
    private alunosService: AlunosService,
    private utilService: UtilService,
    private fb: FormBuilder,
    private notificationService: PoNotificationService
  ) {}

  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  ngOnInit(): void {
    this.initializeData();
  }

  /**
   * Inicialização dos dados
   */
  private initializeData(): void {
    this.createForm();
    this.setEpisodesColumns();
    this.getAlunos();
  }

  /**
   * Obtêm os apisódios
   */
  public getAlunos(): void {
    this.listAlunos = this.getItems();
    this.isLoading = true;

    this.alunosService
      .obterTodosAlunos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.listAlunos = response;
        },
        error: (error) => this.utilService.handleApiError(error),
        complete: () => (this.isLoading = false),
      });
  }

  /**
   * Seta as colunas da tabela
   */
  public setEpisodesColumns(): void {
    this.columnsAlunos = this.getColumns();
  }

  /**
   * Retorna as colunas da tabela
   * @returns
   */
  public getColumns(): PoTableColumn[] {
    return [
      { property: 'id', label: 'Id', width: '22%', visible: false },
      { property: 'nome_aluno', label: 'Nome', width: '22%' },
      { property: 'turma', label: 'Turma', width: '12%' },
      { property: 'responsavel', label: 'Responsável', width: '22%' },
      {
        property: 'nome_materia',
        label: 'Matéria',
        width: '22%',
      },
      {
        property: 'nome_professor',
        label: 'Nome do Professor',
        width: '22%',
      },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getItems(): Array<any> {
    return [
      {
        id: 1,
        nome: 'Aluno 1',
        presenca: 'Confirmada',
        faltas: '5',
        porcentagem_falta: '30%',
      },
      {
        id: 2,
        nome: 'Aluno 2',
        presenca: 'Confirmada',
        faltas: '2',
        porcentagem_falta: '10%',
      },
      {
        id: 3,
        nome: 'Aluno 3',
        presenca: 'Confirmada',
        faltas: '3',
        porcentagem_falta: '20%',
      },
    ];
  }

  createForm() {
    this.formAdicionarAluno = this.fb.group({
      nome_aluno: ['', Validators.required],
      turma: ['', Validators.required],
      responsavel: ['', Validators.required],
    });
  }

  public adicionarNovoAluno() {
    this.modal.open();
  }

  public fechar() {
    this.modal.close();
  }

  public confirmar() {
    if (this.formAdicionarAluno.invalid) {
      return this.notificationService.warning('Formulário inválido!');
    }

    this.isLoading = true;

    this.alunosService
      .criarAluno(this.formAdicionarAluno.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.notificationService.success('Aluno criado com sucesso!');
            this.formAdicionarAluno.reset();
            this.modal.close();
            this.getAlunos();
          } else {
            this.notificationService.success('Houve um erro na criação');
          }
        },
        error: (error) => this.utilService.handleApiError(error),
        complete: () => (this.isLoading = false),
      });
  }
}
