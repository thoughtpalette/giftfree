import { Component } from '@angular/core';
import { HeaderNavComponent } from '../../shared/header-nav/header-nav.component';
import { HeroComponent } from "../../shared/hero/hero.component";
import { FeaturesComponent } from "../../shared/features/features.component";
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [HeaderNavComponent, HeroComponent, FeaturesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
