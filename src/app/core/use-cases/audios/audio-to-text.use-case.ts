import { IAudioToTextResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);

    if (prompt) formData.append('prompt', prompt);

    const resp = await fetch(`${environment.backendAPI}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    const data = (await resp.json()) as IAudioToTextResponse;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
