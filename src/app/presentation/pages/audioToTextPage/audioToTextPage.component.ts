import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  TextMessageEvent,
  TextMessageBoxFileComponent,
} from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { Message } from '@interfaces/IMessage';
import { AiService } from 'app/presentation/services/ai.service';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { IAudioToTextResponse } from '@interfaces/IAudio';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  aiService = inject(AiService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);

  handleMessage(event: TextMessageEvent) {
    const { prompt, file } = event;

    const text = prompt ?? file.name ?? 'Generate the transcription';
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isAI: false,
        text,
      },
    ]);

    this.aiService.audioToText(file, text).subscribe((resp) => {
      this.handleResponse(resp);
    });
  }

  handleResponse(resp: IAudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## Transcription:
    __Duration:__ ${Math.round(resp.duration)} seconds.

    ## The text is:
    ${resp.text}
    `;

    this.messages.update((prev) => [
      ...prev,
      {
        isAI: true,
        text,
      },
    ]);

    for (const segment of resp.segments) {
      const segmentMessage = `
      __From ${Math.round(segment.start)} to ${Math.round(segment.end)} seconds__
      ${segment.text}
      `;

      this.messages.update((prev) => [
      ...prev,
      {
        isAI: true,
        text: segmentMessage,
      },
    ]);
    }
  }
}
