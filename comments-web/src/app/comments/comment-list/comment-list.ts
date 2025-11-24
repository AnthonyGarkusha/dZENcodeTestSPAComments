import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsService, CommentDto } from '../comments.service';
import { CommentItemComponent } from '../comment-item/comment-item';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.html',
  styleUrls: ['./comment-list.scss'],
  imports: [CommonModule, CommentItemComponent]
})
export class CommentListComponent implements OnInit {

  @Input() parentId: number | null = null;

  comments = signal<CommentDto[]>([]);
  loading = false;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();

    document.addEventListener('comment-added', () => {
      this.loadComments();
    });
  }

  loadComments() {
    this.commentsService.getComments().subscribe(all => {
      this.comments.set(this.buildTree(all));
    });
  }

  buildTree(comments: CommentDto[]): CommentDto[] {
    // создаём быстрый lookup-словарь комментариев
    const map = new Map<number, CommentDto>();

    // каждому комменту добавляем replies = []
    comments.forEach(c => {
      c.replies = [];
      map.set(c.id, c);
    });

    const roots: CommentDto[] = [];

    comments.forEach(c => {
      if (c.parentId == null) {
        roots.push(c);
      } else {
        const parent = map.get(c.parentId);
        if (parent) {
          parent.replies.push(c);
        }
      }
    });

    return roots;
  }

  onChildSubmitted() {
    this.loadComments();       // обновляем свой уровень дерева
  }


}
