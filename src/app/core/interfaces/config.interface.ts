export interface Config {
  background: string;
  temperatureUnit: 'C' | 'F';
  appPositions: Record<string, {x: number, y: number}>
}
