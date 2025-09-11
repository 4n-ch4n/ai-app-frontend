import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Message } from '@interfaces/IMessage';
import { AiService } from 'app/presentation/services/ai.service';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from "@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component";

@Component({
  selector: 'app-translate-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent
],
  templateUrl: './translatePage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
  aiService = inject(AiService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);

  languages = [
    { id: 'german', text: 'Alemán' },
    { id: 'arabic', text: 'Arabic' },
    { id: 'bengali', text: 'Bengali' },
    { id: 'spanish', text: 'Spanish' },
    { id: 'french', text: 'French' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'english', text: 'English' },
    { id: 'japanese', text: 'Japanese' },
    { id: 'mandarin', text: 'Mandarin' },
    { id: 'portuguese', text: 'Portuguese' },
    { id: 'russian', text: 'Russian' },
  ];

  handleMessage(event: TextMessageBoxEvent) {
    const { prompt, selectedOption } = event;

    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isAI: false,
        text: prompt,
      },
    ]);

    this.aiService.translateText(prompt, selectedOption).subscribe((resp) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isAI: true,
          text: resp.message,
        },
      ]);
    });
  }
}
