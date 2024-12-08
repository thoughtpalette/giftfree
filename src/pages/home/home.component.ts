import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/hero/hero.component";
import { FeaturesComponent } from "../../shared/features/features.component";

@Component({
  selector: 'home',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
