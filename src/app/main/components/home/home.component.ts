// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '@core/models/comments.model';
import { CommentsService } from '@core/services/comments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  comments$: Observable<Comment[]> = new Observable();

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.comments$ = this.commentsService.getCommentsData().pipe(
      map((data: { comments: Comment[] }) => data.comments.map(comment => {
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }
        return comment;
      }).sort((a, b) => b.score - a.score)) // Sort comments by score in descending order
    );
  }

  handleScoreUpdated(): void {
    // Trigger re-fetch or re-sort of comments
    this.ngOnInit(); // Optionally, refine to avoid complete re-fetch for performance optimization
  }

  handleReplyScoreUpdated(): void {
    this.ngOnInit(); 
  }
}
