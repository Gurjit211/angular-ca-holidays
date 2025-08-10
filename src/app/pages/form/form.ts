import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  private fb = inject(FormBuilder);

  feedbackForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    agree: [false, [Validators.requiredTrue]],
  });

  submitting = false;
  submitted = false;
  error?: string;

  get f() { return this.feedbackForm.controls; }

  async onSubmit() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = undefined;
    try {
      // Simulate a send — real backend not required for this assignment
      await new Promise(r => setTimeout(r, 600));
      this.submitted = true;
      this.feedbackForm.reset({ agree: false });
    } catch {
      this.error = 'Something went wrong. Please try again.';
    } finally {
      this.submitting = false;
    }
  }
}
