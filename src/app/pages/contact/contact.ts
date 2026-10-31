import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { combineLatest } from 'rxjs';
import { ContactApi } from '../../core/services/contact-api';
import { Seo } from '../../core/services/seo';
import { Toast } from '../../core/services/toast';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, TranslocoPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ContactApi);
  private readonly toast = inject(Toast);
  private readonly transloco = inject(TranslocoService);

  constructor() {
    const seo = inject(Seo);
    combineLatest([
      this.transloco.selectTranslate('seo.contact.title'),
      this.transloco.selectTranslate('seo.contact.description'),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => seo.update({ title, description, path: '/contact' }));

    this.form.controls.phone.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        const digits = this.form.controls.phone.value.replace(/\D/g, '').slice(0, 10);
        this.form.controls.phone.setValue(this.formatUsPhone(digits), { emitEvent: false });
      });
  }

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]],
    comment: ['', Validators.required],
  });

  protected readonly sending = signal(false);

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.api.send(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.sending.set(false);
        this.toast.success(
          res?.message || this.transloco.translate('contact.success')
        );
        this.form.reset();
      },
      error: () => {
        this.sending.set(false);
      },
    });
  }

  protected fieldInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.dirty || control.touched);
  }

  protected phoneEmpty(): boolean {
    return this.form.controls.phone.value.length === 0;
  }

  private formatUsPhone(digits: string): string {
    if (!digits) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
}
