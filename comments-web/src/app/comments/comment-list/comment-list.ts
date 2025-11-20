import { Component, OnInit, inject } from '@angular/core';
import { CommentsService } from '../comments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss',
})
export class CommentList implements OnInit {
  private service = inject(CommentsService);

  comments: any[] = [];
  loading = true;

  ngOnInit() {
    this.service.getComments().subscribe((res: { items: any; }) => {
      this.comments = res.items || res;
      this.loading = false;
    });
  }
}
