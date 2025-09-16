import type { IAudioResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!resp.ok) throw new Error(`Couldn't generate the audio`);

    const data = (await resp.json()) as IAudioResponse;

    return {
      ok: true,
      message: prompt,
      audioUrl: data.url,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: `Couldn't generate the audio`,
      audioUrl: '',
    };
  }
};
