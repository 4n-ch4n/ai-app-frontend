import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AiMessageOrthographyComponent } from '@components/chat-bubbles/aiMessageOrthography/aiMessageOrthography.component';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/IMessage';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-orthography-page',
  imports: [
    AiMessageOrthographyComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  aiService = inject(AiService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isAI: false,
        text: prompt,
      },
    ]);

    this.aiService.checkOrthography(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isAI: true,
          text: resp.message,
          info: resp,
        },
      ]);
    });
  }
}
