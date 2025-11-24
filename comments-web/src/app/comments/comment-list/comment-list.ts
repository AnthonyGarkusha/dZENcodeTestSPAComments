import { Component, OnInit, inject } from '@angular/core';
import { CommentsService, CommentDto } from '../comments.service';
import { DatePipe } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss',
})
export class CommentList implements OnInit {

  comments: CommentDto[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.loadComments();

    document.addEventListener('comment-added', () => {
      this.loadComments();
    });
  }

  loadComments() {
    this.commentsService.getComments().subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: err => console.error(err)
    });
  }
}
