export enum Scene {
  Intro = 0,
  CakeClosed = 1,
  CakeOpen = 2,
  Wish = 3,
  Blow = 4,
  Celebration = 5,
}

export interface Drone {
  id: number;
  x: number;
  y: number;
  color: string;
}

export interface GeminiResponse {
  poem: string;
}
