import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslocoPipe } from '@jsverse/transloco';

const VIDEO_URL = 'https://www.facebook.com/reel/1210403493176505';

function embedUrl(url: string): string {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  host: { '(document:keydown.escape)': 'closeVideo()' },
})
export class Hero {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly videoOpen = signal(false);

  protected readonly videoEmbed: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    embedUrl(VIDEO_URL),
  );

  protected openVideo(): void {
    this.videoOpen.set(true);
  }

  protected closeVideo(): void {
    this.videoOpen.set(false);
  }
}
