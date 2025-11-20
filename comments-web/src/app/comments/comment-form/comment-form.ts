import { Component, inject } from '@angular/core';
import { CommentsService } from '../comments.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
})
export class CommentForm {
  private fb = inject(FormBuilder);
  private service = inject(CommentsService);

  form = this.fb.group({
    userName: [''],
    email: [''],
    homePage: [''],
    text: [''],
  });

  submit() {
    if (this.form.invalid) return;

    this.service.createComment(this.form.value).subscribe(() => {
      alert('Комментарий отправлен!');
      this.form.reset();
    });
  }
}
