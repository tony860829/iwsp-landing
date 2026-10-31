import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'IWS+ | Start Getting Clients for your Business',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
    title: 'IWS+ | Services',
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing').then((m) => m.Pricing),
    title: 'IWS+ | Pricing',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'IWS+ | Contact',
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then((m) => m.Blog),
    title: 'IWS+ | Blog',
  },
  {
    path: 'blog/:title',
    loadComponent: () => import('./pages/blog/post').then((m) => m.Post),
    title: 'IWS+ | Blog',
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    data: { doc: 'terms' },
    title: 'IWS+ | Terms of Service',
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    data: { doc: 'privacy' },
    title: 'IWS+ | Privacy Policy',
  },
  {
    path: 'cookies',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    data: { doc: 'cookies' },
    title: 'IWS+ | Cookies Policy',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
