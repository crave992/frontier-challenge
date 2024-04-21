import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '@core/models/comments.model'; // Adjust the path as needed
import { CommentsService } from '@core/services/comments.service'; // Adjust the path as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  comments$: Observable<Comment[]> = new Observable(); // Initialize or manage via strictPropertyInitialization

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.comments$ = this.commentsService.getCommentsData().pipe(
      map((data: { comments: Comment[] }) => data.comments) // Proper typing for `data`
    );
  }
}
