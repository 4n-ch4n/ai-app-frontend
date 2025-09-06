import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  imports: [ReactiveFormsModule],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  placeholder = input<string>('');
  onMessage = output<TextMessageEvent>();

  fb = inject(FormBuilder);
  form = this.fb.group({
    prompt: [],
    file: [null as File | null, Validators.required],
  });
  file = signal<File | undefined>(undefined);

  handleSelectedFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) return;

    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, file } = this.form.value;

    this.onMessage.emit({ prompt, file: file! });
    this.form.reset();
  }
}
