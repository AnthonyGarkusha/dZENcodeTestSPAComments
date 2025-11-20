import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentForm } from './comments/comment-form/comment-form';
import { CommentList } from './comments/comment-list/comment-list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommentForm,
    CommentList
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('comments-web');
}
