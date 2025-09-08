import { Injectable } from '@angular/core';
import { orhtographyUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  checkOrthography(prompt: string) {
    return from(orhtographyUseCase(prompt));
  }
}
