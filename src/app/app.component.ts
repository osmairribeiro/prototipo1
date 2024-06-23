import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoupaComponent } from './roupa/roupa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoupaComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'prototipo';
}
