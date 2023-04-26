import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item, Livros } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private _http: HttpClient) { }

  public getLivros(nome: string, startIndex: number): Observable<Livros> {
    let params = new HttpParams().appendAll({ 'q': nome, startIndex });

    return this._http.get<Livros>(this.API, { params });
  }
}
