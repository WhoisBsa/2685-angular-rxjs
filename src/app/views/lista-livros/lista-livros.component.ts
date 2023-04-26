import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap, distinctUntilChanged, catchError, EMPTY, tap, zip, of } from 'rxjs';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  searchValue = new FormControl();
  errorMessage = '';
  totalDeLivros: number;
  pagination = 0;
  listaLivros: LivroVolumeInfo[] = [];

  livrosEncontrados$ = this.setLivrosEncrontrados();


  setLivrosEncrontrados() {
    return this.searchValue.valueChanges.pipe(
      debounceTime(300),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      switchMap(value => this._livroService.getLivros(value, 0)),
      tap(data => {
        this.totalDeLivros = data.totalItems,
          this.listaLivros = [];
        this.pagination = 0;
      }),
      map(data => data.items ?? []),
      map(items => items.map(item => new LivroVolumeInfo(item))),
      tap(livros => this.listaLivros = livros),
      catchError(erro => {
        console.log(erro);
        this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação.';
        return EMPTY;
      })
    );
  }

  constructor(private _livroService: LivroService) { }

  loadMore() {
    console.log(this.pagination, this.totalDeLivros)
    if (this.pagination  > this.totalDeLivros) return;
    this.pagination += 10;

    this.livrosEncontrados$ = zip(
      of(this.listaLivros),
      this.transformaLivrosEmLivroVolumeInfo()
    ).pipe(
      map(data => [...data[0], ...data[1]]),
      tap(livros => this.listaLivros = livros)
    )
  }

  private transformaLivrosEmLivroVolumeInfo() {
    return this._livroService.getLivros(this.searchValue.value, this.pagination).pipe(
      map(data => data.items ?? []),
      map(items => items.map(item => new LivroVolumeInfo(item))),
      catchError(erro => {
        console.log(erro);
        this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação.';
        return EMPTY;
      })
    );
  }
}



