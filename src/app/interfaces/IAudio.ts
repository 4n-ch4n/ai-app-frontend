export interface IAudioResponse {
  url: string;
}

export interface IAudioToTextResponse {
  language: string;
  duration: number;
  text:     string;
  segments: Segment[];
  task:     string;
}

export interface Segment {
  id:    number;
  start: number;
  end:   number;
  text:  string;
}
