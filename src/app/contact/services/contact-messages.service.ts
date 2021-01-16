import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ContactMessage } from '../models';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ContactMessagesService {  
  readonly BASE_URL = "http://localhost:3000/ContactMessages";

  constructor(
    private http: HttpClient
  ) { }
  
  add(msg: ContactMessage): Observable<boolean> {
    let operation = "Add Contact Message";
    msg.CreatedAt = new Date();
    return this.http.post<ContactMessage>(this.BASE_URL, msg)
      .pipe(
        map(() => {
          return true;
        }),        
        catchError(err => this.errorHandler(err, operation))
      );
  }
  
  errorHandler(error: HttpErrorResponse, operation: string) {
    let errorMessage = `There was an error on '${operation}' operation.`;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `${errorMessage}\nError: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${errorMessage}\nError Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
