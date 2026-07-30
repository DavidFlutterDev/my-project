import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ClToastService } from '@clay/ui-components/basic';
import { CommonDateService } from './pages/common-services/common-date-services';

@Component({
  standalone: true,
  imports: [RouterOutlet, MatIconModule, ],
  providers:[ClToastService, DatePipe],
  selector: 'myapp-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = 'dashboard';
}
