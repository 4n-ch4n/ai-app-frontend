import { Injectable } from '@angular/core';
import {
  orhtographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  checkOrthography(prompt: string) {
    return from(orhtographyUseCase(prompt));
  }

  discussPronsCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  discussPronsConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }
}
