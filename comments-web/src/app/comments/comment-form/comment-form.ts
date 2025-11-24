import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommentsService, CommentDto } from '../comments.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.scss']
})
export class CommentFormСomponent {

  @Input() parentId: number | null = null;

  @Output() submitted = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentsService: CommentsService
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      homepage: [''],
      text: ['', Validators.required]
    });
  }

  send() {
    if (this.form.invalid) return;

    const data = {
      ...this.form.value,
      parentId: this.parentId
    } as CommentDto;

    this.commentsService.createComment(data).subscribe({
      next: () => {
        this.form.reset();
        this.submitted.emit();
      },
      error: (err) => console.error(err)
    });
  }
}
