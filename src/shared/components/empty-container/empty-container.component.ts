import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'empty-container',
  standalone: true,
  imports: [],
  templateUrl: './empty-container.component.html',
  styleUrl: './empty-container.component.scss'
})
export class EmptyContainerComponent {
  @Input() icon: 'list' | 'gift' = 'list'
  @Input() title = 'No Results'
  @Input() description = 'Please try expanding your search.'
  @Input() showButton = false
  @Input() buttonText = ''
  
  @Output() onButtonClick = new EventEmitter<void>()
}
