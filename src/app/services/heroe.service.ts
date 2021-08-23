import { Injectable } from '@angular/core';
import { Heroe } from '../models/hero';
import { HEROES } from './mock-herees';
import { Observable, of } from 'rxjs';
import { MensajeService } from './mensaje.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private mensajeService: MensajeService,
    private http: HttpClient
  ) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http
      .get<Heroe[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(
          this.handleError<Heroe[]>('getHeroes', [])
        )
      );
  }
  getHeroe(id: number): Observable<Heroe | undefined> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Heroe>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Heroe>(`getHeroe id=${id}`))
    );
  }
  actualizarHeroe(heroe: Heroe): Observable<any> {
    return this.http.put(this.heroesUrl, heroe, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${heroe.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  agregarHeroe(hero: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Heroe) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Heroe>('addHero'))
    );
  }
  deleteHero(hero: Heroe | number): Observable<Heroe> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Heroe>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Heroe>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Heroe[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Heroe[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Heroe[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.mensajeService.add(`HeroService: ${message}`);
  }
}
