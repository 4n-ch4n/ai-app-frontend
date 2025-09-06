import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { AiService } from 'app/presentation/services/ai.service';
import { TextMessageBoxComponent } from "@components/text-boxes/textMessageBox/textMessageBox.component";

@Component({
  selector: 'app-chat-template',
  imports: [
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  aiService = inject(AiService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);

  handleMessage(prompt: string) {
    console.log(prompt);
  }
}
