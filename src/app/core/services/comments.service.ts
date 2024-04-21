import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommentData, Comment } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private dataUrl = 'assets/data/comments/data.json'; // URL to data file
  private localStorageKey = 'commentsData'; // LocalStorage key

  constructor(private http: HttpClient) { }

  // Read: Fetch all comments
  getCommentsData(): Observable<CommentData> {
    const commentsData = localStorage.getItem(this.localStorageKey);
    if (commentsData) {
      return of(JSON.parse(commentsData));
    } else {
      return this.http.get<CommentData>(this.dataUrl)
        .pipe(
          map(data => {
            localStorage.setItem(this.localStorageKey, JSON.stringify(data));
            return data;
          }),
          catchError(this.handleError<CommentData>('getCommentsData', undefined))
        );
    }
  }

  // Create: Add a new comment
  addComment(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.dataUrl, newComment)
      .pipe(
        map(comment => {
          this.updateLocalStorageComments(comment);
          return comment;
        }),
        catchError(this.handleError<Comment>('addComment', newComment))
      );
  }

  // Update: Update a comment
  updateComment(id: number, commentUpdates: Partial<Omit<Comment, 'id'>>): Observable<Comment> {
    const url = `${this.dataUrl}/comments/${id}`;
    return this.http.put<Comment>(url, { id, ...commentUpdates })
      .pipe(
        map(updatedComment => {
          this.updateLocalStorageComments(updatedComment, id);
          return updatedComment;
        }),
        catchError(this.handleError<Comment>('updateComment'))
      );
  }

  // Delete: Delete a comment
  deleteComment(id: number): Observable<any> {
    const url = `${this.dataUrl}/comments/${id}`;
    return this.http.delete(url)
      .pipe(
        map(_ => {
          this.removeLocalStorageComment(id);
          return _;
        }),
        catchError(this.handleError('deleteComment', null))
      );
  }

  // Update localStorage after adding or updating a comment
  private updateLocalStorageComments(comment: Comment, id?: number): void {
    const commentsData = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    if (id) {
      const index = commentsData.comments.findIndex((c: Comment) => c.id === id);
      if (index !== -1) {
        commentsData.comments[index] = comment;
      }
    } else {
      commentsData.comments.push(comment);
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(commentsData));
  }

  // Remove a comment from localStorage
  private removeLocalStorageComment(id: number): void {
    const commentsData = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    commentsData.comments = commentsData.comments.filter((c: Comment) => c.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(commentsData));
  }

  // CRUD Operations for replies within a comment
  addReply(commentId: number, newReply: Comment): Observable<Comment> {
    // Retrieve comments from localStorage
    const commentsData = this.fetchCommentsData();
    const comment = commentsData.comments.find(c => c.id === commentId);
    if (comment) {
      newReply.id = this.generateNewId(commentsData.comments); // Assume generateNewId generates a unique ID
      comment.replies = comment.replies ? [...comment.replies, newReply] : [newReply];
      this.saveCommentsData(commentsData);
    }
    return of(newReply).pipe(catchError(this.handleError<Comment>('addReply', newReply)));
  }

  updateReply(commentId: number, replyId: number, updates: Partial<Comment>): Observable<Comment | undefined> {
    const commentsData = this.fetchCommentsData();
    const comment = commentsData.comments.find(c => c.id === commentId);
    const reply = comment?.replies?.find(r => r.id === replyId);
    if (reply) {
      Object.assign(reply, updates);
      this.saveCommentsData(commentsData);
      return of(reply);
    } else {
      return of(undefined).pipe(
        catchError(this.handleError<Comment | undefined>('updateReply', undefined))
      );
    }
  }

  deleteReply(commentId: number, replyId: number): Observable<any> {
    const commentsData = this.fetchCommentsData();
    const comment = commentsData.comments.find(c => c.id === commentId);
    if (comment && comment.replies) {
      comment.replies = comment.replies.filter(r => r.id !== replyId);
      this.saveCommentsData(commentsData);
    }
    return of(null).pipe(catchError(this.handleError('deleteReply')));
  }

  private fetchCommentsData(): CommentData {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
  }

  private saveCommentsData(data: CommentData): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  private generateNewId(comments: Comment[]): number {
    return comments.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1;
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
