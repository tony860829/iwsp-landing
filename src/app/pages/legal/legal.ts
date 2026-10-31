import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { combineLatest } from 'rxjs';
import { Seo } from '../../core/services/seo';

interface LegalSection {
  title: string;
  text: string;
}

interface LegalDoc {
  path: string;
  titleKey: string;
  updatedKey: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
  sections: LegalSection[];
}

const DOCS: Record<string, LegalDoc> = {
  terms: {
    path: '/terms',
    titleKey: 'legal.terms.title',
    updatedKey: 'legal.terms.updated',
    seoTitleKey: 'seo.terms.title',
    seoDescriptionKey: 'seo.terms.description',
    sections: [
      { title: 'legal.terms.s1Title', text: 'legal.terms.s1Text' },
      { title: 'legal.terms.s2Title', text: 'legal.terms.s2Text' },
      { title: 'legal.terms.s3Title', text: 'legal.terms.s3Text' },
      { title: 'legal.terms.s4Title', text: 'legal.terms.s4Text' },
      { title: 'legal.terms.s5Title', text: 'legal.terms.s5Text' },
      { title: 'legal.terms.s6Title', text: 'legal.terms.s6Text' },
      { title: 'legal.terms.s7Title', text: 'legal.terms.s7Text' },
      { title: 'legal.terms.s8Title', text: 'legal.terms.s8Text' },
      { title: 'legal.terms.s9Title', text: 'legal.terms.s9Text' },
      { title: 'legal.terms.s10Title', text: 'legal.terms.s10Text' },
    ],
  },
  privacy: {
    path: '/privacy',
    titleKey: 'legal.privacy.title',
    updatedKey: 'legal.privacy.updated',
    seoTitleKey: 'seo.privacy.title',
    seoDescriptionKey: 'seo.privacy.description',
    sections: [
      { title: 'legal.privacy.s1Title', text: 'legal.privacy.s1Text' },
      { title: 'legal.privacy.s2Title', text: 'legal.privacy.s2Text' },
      { title: 'legal.privacy.s3Title', text: 'legal.privacy.s3Text' },
      { title: 'legal.privacy.s4Title', text: 'legal.privacy.s4Text' },
      { title: 'legal.privacy.s5Title', text: 'legal.privacy.s5Text' },
      { title: 'legal.privacy.s6Title', text: 'legal.privacy.s6Text' },
      { title: 'legal.privacy.s7Title', text: 'legal.privacy.s7Text' },
      { title: 'legal.privacy.s8Title', text: 'legal.privacy.s8Text' },
      { title: 'legal.privacy.s9Title', text: 'legal.privacy.s9Text' },
    ],
  },
  cookies: {
    path: '/cookies',
    titleKey: 'legal.cookies.title',
    updatedKey: 'legal.cookies.updated',
    seoTitleKey: 'seo.cookies.title',
    seoDescriptionKey: 'seo.cookies.description',
    sections: [
      { title: 'legal.cookies.s1Title', text: 'legal.cookies.s1Text' },
      { title: 'legal.cookies.s2Title', text: 'legal.cookies.s2Text' },
      { title: 'legal.cookies.s3Title', text: 'legal.cookies.s3Text' },
      { title: 'legal.cookies.s4Title', text: 'legal.cookies.s4Text' },
      { title: 'legal.cookies.s5Title', text: 'legal.cookies.s5Text' },
    ],
  },
};

@Component({
  selector: 'app-legal-page',
  imports: [TranslocoPipe],
  templateUrl: './legal.html',
  styleUrl: './legal.scss',
})
export class Legal {
  private readonly doc: LegalDoc = DOCS[inject(ActivatedRoute).snapshot.data['doc'] as string] ?? DOCS['terms'];

  protected readonly titleKey = this.doc.titleKey;
  protected readonly updatedKey = this.doc.updatedKey;
  protected readonly sections = this.doc.sections;

  constructor() {
    const seo = inject(Seo);
    const transloco = inject(TranslocoService);
    combineLatest([
      transloco.selectTranslate(this.doc.seoTitleKey),
      transloco.selectTranslate(this.doc.seoDescriptionKey),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => seo.update({ title, description, path: this.doc.path }));
  }
}
