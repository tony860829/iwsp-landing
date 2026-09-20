# IWS+ Landing — Contexto del proyecto

Landing page pública de IWS+ (InfoWebSolutionsPlus) en **Angular 20** (standalone, SSR/prerender, zoneless, SCSS puro sin frameworks CSS). Reemplaza la landing que antes convivía en el proyecto `iwspApp` (Angular 15, app de gestión, NO tocar: la app de gestión vive en `admin.iwsp.com`).

## Dominio y despliegue
- Landing: `https://iwsplus.com/` (dominio raíz)
- App de gestión existente: `admin.iwsp.com` (proyecto hermano `../iwspApp`)
- Backend API (compartido con la app de gestión): configurado en `src/environments/environment.ts` (`apiUrl: https://serveriwsp.online/api/` + `apiKey`)

## Decisiones tomadas
- Solo 4 páginas: Home (`/`), Services (`/services`), Pricing (`/pricing`), Contact (`/contact`). **Sin blog** (eliminado del viejo menú).
- Idioma del contenido: **inglés** (mockup de diseño en inglés, paleta navy `#191A36` + naranja `#FF5C1A`, tipografía Poppins).
- Services y Pricing consumen datos del backend en tiempo real (no contenido estático).
- En Pricing se muestran **todos** los paquetes sin filtrar por `isActive` (la app vieja filtraba en frontend causando "Aún no hay planes").
- En Services se **deduplican** por nombre (la API devuelve duplicados, ej. "Web Development" doble).
- Botón de compra de un plan → navega a `/contact` (no hay checkout en la landing).
- Contact envía leads vía `POST {apiUrl}Check?token={apiKey}` (mismo endpoint del proyecto viejo).
- El usuario NO quiere que se ejecute `ng build`/`ng serve` desde el agente salvo que lo pida (él lo prueba; hay binarios esbuild de Windows y el entorno shell es WSL).
- Solo verificación de tipos con: `npx tsc -p tsconfig.app.json --noEmit`.
- **Multiidioma con Transloco** (`@jsverse/transloco` v8): inglés por defecto, español opcional. Selector EN|ES en el header. Persiste en `localStorage` (`iws-lang`), fallback al idioma del navegador. Traducciones en `public/i18n/en.json` y `es.json` (namespaces: header, footer, home.*, services, pricing, contact, errors, seo). Loader HTTP: `core/services/transloco-loader.ts`; servicio de idioma: `core/services/lang.ts` (también actualiza `<html lang>` y registra locale `es`). SEO por página es reactivo al cambio de idioma (`selectTranslate` + `takeUntilDestroyed` en cada página). Datos del API (nombres/descr. de servicios y planes) NO se traducen. Mensajes de error que vienen del API se muestran tal cual (solo el genérico se traduce).
- Logo: `public/images/logo-orange.png` (recolor #FF5C1A del original negro `logo.png`, hecho con script Node) usado en header y footer sobre fondo navy.
- UX async global: interceptor de loading (spinner overlay full-screen) + interceptor de errores (toast) + servicio de toasts. El éxito de Contact también se muestra con toast.
- **⚠️ NG0600 en zoneless**: Transloco carga los JSONs de idioma vía HTTP *durante el render del template*. Por eso: (1) el loading interceptor omite requests a `/i18n/` y todo en servidor (SSR), y difiere escrituras a signals con `queueMicrotask`; (2) el servicio Toast también difiere escrituras con `queueMicrotask`. NUNCA escribir un signal directamente en un interceptor o en callbacks de observables disparados desde templates.
- Redes sociales reales en footer: Facebook (`facebook.com/profile.php?id=61552316190893`), Instagram (`@infowebsolutionsplus`), TikTok (genérico, falta el perfil real). LinkedIn/X eliminados.
- Header selector de idioma: cuidado, los `<button>` no heredan `font`/`color`; estilos propios en `header.scss` (NO meterlos dentro del bloque `@media`).

## Estructura
```
src/app/
  core/
    header|footer/            # layout (navbar navy + logo, footer navy)
    spinner/  toast/          # componentes globales montados en app.html
    interceptors/
      loading.interceptor.ts  # envuelve requests con Loading (contador concurrente)
      error.interceptor.ts    # toast de error (mensaje API o genérico) y re-lanza
    models/api.models.ts      # IService, IPackage, ContactPayload, ContactResponse
    services/
      services-api.ts         # GET {apiUrl}Services
      packages-api.ts         # GET {apiUrl}Packages
      contact-api.ts          # POST {apiUrl}Check?token=
      seo.ts                  # meta tags por página (title, description, OG, Twitter)
      loading.ts              # signal con contador de requests activas
      toast.ts                # toasts success/error con auto-dismiss 5s
  pages/
    home/                     # secciones: hero, stats, tailored, solutions, audience, process, team, cta
    services/  pricing/  contact/
src/environments/             # environment.ts + environment.development.ts
public/images/                # hero.webp, design.webp, development.webp, marketing.webp (IA), logo.png, logo-orange.png
public/i18n/en.json, es.json # traducciones Transloco
public/sitemap.xml, public/robots.txt
```

## Estado actual (hecho)
- Sistema de diseño en `src/styles.scss` (variables CSS, `.container`, `.section`, `.section--dark/--light`, botones).
- Home completo con 8 secciones según el mockup provisto por el usuario.
- Services/Pricing/Contact conectados al backend con estados loading/error/empty.
- SEO completo + prerender (`app.routes.server.ts` → `RenderMode.Prerender` para `**`) + sitemap + robots.
- Todos los textos en inglés; logo naranja real en header/footer.
- Spinner global + toasts (éxito/error) vía interceptores registrados en `app.config.ts`.
- i18n EN/ES completo (Transloco), selector en header, SEO reactivo al idioma, persistencia en localStorage.
- Redes sociales reales en el footer.

## Pendiente
- Posibles ajustes visuales que pida el usuario tras probar.
- Contenido legal (Terms/Privacy/Cookies del footer, links aún `#`).
