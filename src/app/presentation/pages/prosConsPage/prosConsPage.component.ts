import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/IMessage';
import { AiService } from 'app/presentation/services/ai.service';
import { AiMessageOrthographyComponent } from "@components/chat-bubbles/aiMessageOrthography/aiMessageOrthography.component";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxComponent,
    TypingLoaderComponent,
    MarkdownComponent
],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
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

    this.aiService.discussPronsCons(prompt).subscribe((resp) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isAI: true,
          text: resp.content,
        },
      ]);
    });
  }
}
