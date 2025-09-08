import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ai-message-orthography',
  imports: [],
  templateUrl: './aiMessageOrthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiMessageOrthographyComponent {
  userScore = input.required<number>();
  text = input.required<string>();
  errors = input<string[]>([]);
}
