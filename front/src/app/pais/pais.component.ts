import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent {
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
  public listEpisodes: any[] = [];
  public clonedListEpisodes: any[] = [];
  public columnsEpisodes: PoTableColumn[] = [];

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
    { label: 'Turma A', value: 'a' },
    { label: 'Turma B', value: 'b' },
    { label: 'Turma C', value: 'c' },
  ];

  public disciplinas: any[] = [
    { label: 'Matemática', value: 'Mat' },
    { label: 'Física', value: 'Fis' },
    { label: 'Química', value: 'Quim' },
  ];

  public alunos: any[] = [
    { label: 'José', value: 'J' },
    { label: 'Victor', value: 'V' },
    { label: 'João', value: 'J' },
  ];

  public periodo: any[] = [
    { label: 'Manhã', value: 'M' },
    { label: 'Tarde', value: 'T' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.initializeData();
  }

  /**
   * Inicialização dos dados
   */
  private initializeData(): void {
    this.setEpisodesColumns();
    this.getEpisodes();
  }

  /**
   * Obtêm os apisódios
   */
  public getEpisodes(): void {
    this.listEpisodes = this.getItems();
    // this.isLoading = true;

    // this.episodesService
    //   .getAllEpisodes()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response) => {
    //       const episodes = this.addViewDetails(response.results);
    //       this.listEpisodes  = this.getItems()
    //     },
    //     error: (error) => this.utilService.handleApiError(error),
    //     complete: () => (this.isLoading = false),
    //   });
  }

  /**
   * Seta as colunas da tabela
   */
  public setEpisodesColumns(): void {
    this.columnsEpisodes = this.getColumns();
  }

  /**
   * Retorna as colunas da tabela
   * @returns
   */
  public getColumns(): PoTableColumn[] {
    return [
      { property: 'id', label: 'Id', width: '22%', visible: false },
      { property: 'nome', label: 'Nome', width: '22%' },
      { property: 'presenca', label: 'Presença', width: '22%' },
      { property: 'faltas', label: 'Falta', width: '22%' },
      {
        property: 'porcentagem_falta',
        label: 'Porcentagem de Falta',
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
}
