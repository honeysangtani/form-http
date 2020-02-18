import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Name } from './name';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  baseurl = ' http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // POST
  CreateName(data): Observable<Name> {
    return this.http.post<Name>(this.baseurl + '/track/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } 

  // GET
  GetNames(): Observable<Name> {
    return this.http.get<Name>(this.baseurl + '/track/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

   // DELETE
   DeleteName(id){
    return this.http.delete<Name>(this.baseurl + '/track/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // UPDATE
  UpdateName(id, data): Observable<Name> {
    return this.http.put<Name>(this.baseurl + '/track/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
