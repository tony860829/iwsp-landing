import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Spinner } from './core/spinner/spinner';
import { ToastContainer } from './core/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Spinner, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
