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
import {
  TextMessageBoxEvent,
  TextMessageBoxSelectComponent,
} from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  aiService = inject(AiService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);

  voices = [
    { id: "Zephyr", text: "Zephyr" },
    { id: "Kore", text: "Kore" },
    { id: "Orus", text: "Orus" },
    { id: "Autonoe", text: "Autonoe" },
    { id: "Fenrir", text: "Fenrir" },
    { id: "Aoede", text: "Aoede" },
    { id: "Charon", text: "Charon" },
  ];

  handleMessage(event: TextMessageBoxEvent) {
    const { prompt, selectedOption } = event;

    const message = `${selectedOption} - ${prompt}`;

    this.messages.update((prev) => [
      ...prev,
      {
        text: message,
        isAI: false,
      },
    ]);
    this.isLoading.set(true);

    this.aiService.textToAudio(prompt, selectedOption).subscribe((resp) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isAI: true,
          text: resp.message,
          audioUrl: resp.audioUrl,
        },
      ]);
    });
  }
}
