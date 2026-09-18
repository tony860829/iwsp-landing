import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactApi } from '../../core/services/contact-api';
import { Seo } from '../../core/services/seo';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ContactApi);

  constructor() {
    inject(Seo).update({
      title: 'IWS+ | Contact',
      description:
        'Ready to get more clients? Contact IWS+ and let us help your business grow online.',
      path: '/contact',
    });
  }

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    comment: ['', Validators.required],
  });

  protected readonly sending = signal(false);
  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  protected onSubmit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.api.send(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.sending.set(false);
        this.successMessage.set(res.message || '¡Gracias! Te contactaremos pronto.');
        this.form.reset();
      },
      error: (err) => {
        this.sending.set(false);
        this.errorMessage.set(
          err?.error?.message || 'No pudimos enviar tu mensaje. Intenta de nuevo.'
        );
      },
    });
  }

  protected fieldInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.dirty || control.touched);
  }
}
