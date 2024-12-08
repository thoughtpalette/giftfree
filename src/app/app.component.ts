import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavComponent } from "../shared/header-nav/header-nav.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderNavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'giftfree';
}
