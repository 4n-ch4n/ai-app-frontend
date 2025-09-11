import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Message } from '@interfaces/IMessage';
import { AiService } from 'app/presentation/services/ai.service';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MarkdownComponent } from 'ngx-markdown';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';

@Component({
  selector: 'app-pros-cons-steam-page',
  imports: [
    ChatMessageComponent,
    MarkdownComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {
  aiService = inject(AiService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);
  abortSignal = new AbortController();

  async handleMessage(prompt: string) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      {
        isAI: false,
        text: prompt,
      },
      {
        isAI: true,
        text: '...',
      },
    ]);

    this.isLoading.set(true);

    const stream = this.aiService.discussPronsConsStream(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { isAI: true, text: message }]);
  }
}
