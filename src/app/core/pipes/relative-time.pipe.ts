// src/app/pipes/relative-time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, parseISO } from 'date-fns';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string): string {
    let relativeTime = formatDistanceToNow(parseISO(value), { addSuffix: true });

    // Remove unwanted words by replacing them with an empty string
    relativeTime = relativeTime.replace(/about|almost|less than|over|almost|close to/gi, '').trim();

    // Optional: refine the string by handling excessive spacing if needed
    relativeTime = relativeTime.replace(/\s{2,}/g, ' ');

    return relativeTime;
  }
}
