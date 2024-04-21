import { Component, Input, OnInit } from '@angular/core';
import { Comment, User } from 'app/core/models/comments.model';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
})
export class DataCardComponent implements OnInit {
@Input() comment: Comment = <Comment>{};

  constructor() { }

  ngOnInit(): void {
  }

  getAssetPath(imagePath: string): string {
    // Remove all leading dots and slashes to form a clean path
    const cleanPath = imagePath.replace(/^\.+\/+/g, '');
    return `/assets/${cleanPath}`;
  }
}