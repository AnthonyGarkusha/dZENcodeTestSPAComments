import { Component, signal, ViewChild } from '@angular/core';
import { CommentFormСomponent } from './comments/comment-form/comment-form';
import { CommentListComponent } from './comments/comment-list/comment-list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommentFormСomponent,
    CommentListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('comments-web');

  @ViewChild('rootList') rootList!: CommentListComponent;

  reloadRoot() {
    this.rootList.loadComments();   //  обновление корня
  }
}
