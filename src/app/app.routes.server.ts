import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Ruta parametrizada: se renderiza en el servidor en cada request.
    // El prerender estático del catch-all no puede cubrirla sin
    // getPrerenderParams (que congelaría la lista de posts en el build).
    path: 'blog/:title',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
