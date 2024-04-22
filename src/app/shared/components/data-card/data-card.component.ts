// src/app/components/data-card/data-card.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Comment } from 'app/core/models/comments.model';
import { CommentsService } from 'app/core/services/comments.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
})
export class DataCardComponent implements OnInit {
  @Input() comment: Comment = <Comment>{};
  @Output() scoreUpdated = new EventEmitter<boolean>();  // Emit when score updates

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  getAssetPath(imagePath: string): string {
    const cleanPath = imagePath.replace(/^\.+\/+/g, '');
    return `/assets/${cleanPath}`;
  }

  updateScore(increment: boolean): void {
    this.commentsService.updateCommentScore(this.comment.id, increment).subscribe({
      next: updatedComment => {
        if (updatedComment) {
          this.comment.score = updatedComment.score;
          this.scoreUpdated.emit(true);  // Emit event on score update
        }
      },
      error: err => console.error('Failed to update comment score', err)
    });
  }
}
