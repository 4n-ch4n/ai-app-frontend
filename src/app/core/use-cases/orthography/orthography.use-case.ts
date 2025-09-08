import { OrthographyResponse } from '@interfaces/IOrthography';
import { environment } from 'environments/environment';

export const orhtographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendAPI}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error(`Couldn't make the correction`);

    const data = (await resp.json()) as OrthographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: `Couldn't make the correction`,
    };
  }
};
