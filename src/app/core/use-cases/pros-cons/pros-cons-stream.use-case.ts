import { environment } from 'environments/environment';

export async function* prosConsStreamUseCase(
  prompt: string,
  abortSignal: AbortSignal
) {
  try {
    const resp = await fetch(
      `${environment.backendAPI}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );

    if (!resp.ok) throw new Error(`Couldn't load the text`);

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log(`couldn't generate the reader`);
      throw new Error(`couldn't generate the reader`);
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      const decodedChunck = decoder.decode(value, { stream: true });
      text += decodedChunck;
      yield text;
    }

    return text;
  } catch (error) {
    return null;
  }
}
