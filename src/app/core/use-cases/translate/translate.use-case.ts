import type { ITranslateResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error(`Couldn't make the translate`);

    const { message } = (await resp.json()) as ITranslateResponse;

    return {
      ok: true,
      message,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: `Couldn't make the correction`,
    };
  }
};
