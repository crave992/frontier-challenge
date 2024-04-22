import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Comment } from '@core/models/comments.model';
import { CommentsService } from 'app/core/services/comments.service';

@Component({
  selector: 'app-data-card-reply',
  templateUrl: './data-card-reply.component.html',
})
export class DataCardReplyComponent implements OnInit {
  @Input() reply: Comment = <Comment>{};
  @Output() scoreUpdated = new EventEmitter<boolean>();

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  getAssetPath(imagePath: string): string {
    const cleanPath = imagePath.replace(/^\.+\/+/g, '');
    return `/assets/${cleanPath}`;
  }

  updateScore(increment: boolean): void {
    if (!this.reply || !this.reply.id) {
      console.error('Invalid reply data');
      return;
    }

    this.commentsService.updateReplyScore(this.reply.id, increment).subscribe({
      next: updatedReply => {
        if (updatedReply) {
          this.reply.score = updatedReply.score; // Update the local score with the new value
          this.scoreUpdated.emit(true); // Emit event on score update
        } else {
          console.error('Reply not found');
        }
      },
      error: err => console.error('Failed to update reply score', err)
    });
  }
}
