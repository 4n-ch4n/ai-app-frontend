import { IProsConsResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error(`Couldn't load the text`);

    const data = (await resp.json()) as IProsConsResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      content: `Couldn't load the text`,
    };
  }
};
