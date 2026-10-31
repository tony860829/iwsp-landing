import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { BlogApi } from '../../core/services/blog-api';
import { IComment, IPost } from '../../core/models/api.models';
import { Seo } from '../../core/services/seo';
import { Toast } from '../../core/services/toast';
import { Lang } from '../../core/services/lang';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post-page',
  imports: [RouterLink, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(BlogApi);
  private readonly seo = inject(Seo);
  private readonly toast = inject(Toast);
  private readonly transloco = inject(TranslocoService);
  private readonly lang = inject(Lang);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly post = signal<IPost | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  protected readonly comments = signal<IComment[]>([]);
  protected readonly loadingComments = signal(false);
  protected readonly sending = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    // Parametrizada: puede llegar un título nuevo sin recrear el componente
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const title = params.get('title');
        if (title) this.loadPost(title);
      });
  }

  private loadPost(title: string): void {
    this.loading.set(true);
    this.error.set(false);
    this.post.set(null);
    this.api.getPostByTitle(title).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);
        this.applySeo(post);
        this.loadComments(post.id!);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  private applySeo(post: IPost): void {
    const plain = (post.content ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const description = plain.length > 155 ? plain.slice(0, 155) + '…' : plain;
    this.seo.update({
      title: `${post.title ?? ''} | IWS+`,
      description,
      path: `/blog/${encodeURIComponent(post.title ?? '')}`,
    });
  }

  private loadComments(postId: number): void {
    this.loadingComments.set(true);
    this.api.getComments(postId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.loadingComments.set(false);
      },
      error: () => {
        this.loadingComments.set(false);
      },
    });
  }

  protected imageSrc(picture?: string): string | null {
    return picture ? `${environment.apiUrl}Upload/getPhoto/${picture}` : null;
  }

  protected formatDate(date?: string): string {
    if (!date) return '';
    const locale = this.lang.activeLang() === 'es' ? 'es' : 'en';
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date));
  }

  protected commentName(comment: IComment): string {
    return `${comment.firstName ?? ''} ${comment.lastName ?? ''}`.trim();
  }

  protected onSubmit(): void {
    const post = this.post();
    if (!post?.id) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.api
      .sendComment({ ...this.form.getRawValue(), postsId: post.id })
      .subscribe({
        next: (res) => {
          this.sending.set(false);
          this.toast.success(
            res?.message || this.transloco.translate('blog.commentSuccess')
          );
          this.form.reset();
          this.loadComments(post.id!);
        },
        error: () => {
          // El toast de error lo muestra el interceptor global
          this.sending.set(false);
        },
      });
  }

  protected fieldInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.dirty || control.touched);
  }
}
