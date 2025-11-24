import { Component, Input, EventEmitter, Output, Pipe } from '@angular/core';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { CommentDto } from '../comments.service';
import { CommentFormСomponent } from '../comment-form/comment-form';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  templateUrl: './comment-item.html',
  styleUrls: ['./comment-item.scss'],
  imports: [DatePipe, NgIf, NgFor, CommentFormСomponent,]
})
export class CommentItemComponent {

  @Input() comment!: CommentDto;

  @Output() reload = new EventEmitter<void>();

  // флаг для показа формы
  showReplyForm = false;

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

  onReplySubmitted() {
    // Закрываем форму после отправки
    this.showReplyForm = false;
    this.reload.emit();   
  }

  
}
