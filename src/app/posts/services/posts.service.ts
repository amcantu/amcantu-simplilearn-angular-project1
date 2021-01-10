import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Post } from '../models';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PostsService {  
  readonly BASE_URL = "http://localhost:3000/Posts";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Post[]>{
    let operation = "Get All Posts";
    return this.http.get<Post[]>(this.BASE_URL).pipe(    
      catchError(err => this.errorHandler(err, operation))
    );
  }

  getById(id: number): Observable<Post>{
    let operation = `Get Post Id ${id}`;
    return this.http.get<Post>(`${this.BASE_URL}/${id}`).pipe(    
      catchError(err => this.errorHandler(err, operation))
    );
  }
  
  add(post: Post): Observable<boolean> {
    let operation = "Add Post";
    return this.http.post<Post>(this.BASE_URL, post)
      .pipe(
        map(() => {
          return true;
        }),        
        catchError(err => this.errorHandler(err, operation))
      );
  }

  edit(editedPost: Post): Observable<boolean>{
    let operation = "Edit Post";
    return this.http.put<Post>(`${this.BASE_URL}/${editedPost.Id}`, editedPost)
      .pipe(
        map(() => {
          return true;
        }),        
        catchError(err => this.errorHandler(err, operation))
      );
  }

  delete(postId: number): Observable<boolean> {
    let operation = "Delete Post";
    return this.http.delete(`${this.BASE_URL}/${postId}`)
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
