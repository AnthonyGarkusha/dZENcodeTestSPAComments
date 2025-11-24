import { Component, inject } from '@angular/core';
import { CommentDto, CommentsService } from '../comments.service';
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
    if (this.form.valid) {

    const data = this.form.value as CommentDto;

    this.service.createComment(data).subscribe({
      next: (result) => {
        console.log("Created:", result);
        this.form.reset();
      },
      error: err => console.error(err)
      });
    } 
  }
}
