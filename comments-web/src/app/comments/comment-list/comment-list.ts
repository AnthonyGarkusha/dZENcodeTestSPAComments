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
      this.sortComments();
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

  sortField = 'createdAt';   // userName | email | createdAt
  sortDirection: 'asc' | 'desc' = 'asc';

  setSort(field: string) {
    if (this.sortField === field) {
      // если нажали на ту же колонку — меняем направление
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
    }

    this.sortComments();
  }

  sortComments() {
    const sorted = [...this.comments()]  // копия массива
      .sort((a, b) => {
        let x: any = '';
        let y: any = '';

        if (this.sortField === 'userName') {
          x = a.userName.toLowerCase();
          y = b.userName.toLowerCase();
        } else if (this.sortField === 'email') {
          x = a.email.toLowerCase();
          y = b.email.toLowerCase();
        } else if (this.sortField === 'createdAt') {
          x = new Date(a.createdAt).getTime();
          y = new Date(b.createdAt).getTime();
        }

        if (x < y) return this.sortDirection === 'asc' ? -1 : 1;
        if (x > y) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

    this.comments.set(sorted);
  }


}
