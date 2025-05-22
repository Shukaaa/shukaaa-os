import { ConfigStore } from './config.store';

describe('ConfigStore', () => {
  let store: ConfigStore;

  beforeEach(() => {
    localStorage.clear();
    store = new ConfigStore();
  });

  it('should initialize with default values if nothing exists in localStorage', () => {
    expect(store.get('background')).toBe('landscape.jpg');
    expect(store.get('temperatureUnit')).toBe('C');
    // @ts-ignore
    expect(store.get('appPositions').settings).toEqual({ x: 0, y: 0 });
  });

  it('should store and retrieve updated temperature unit', () => {
    store.set('temperatureUnit', 'F');
    expect(store.get('temperatureUnit')).toBe('F');
  });

  it('should update background correctly', () => {
    store.set('background', 'cat.jpg');
    expect(store.get('background')).toBe('cat.jpg');
  });

  it('should store and retrieve app position', () => {
    store.set('appPositions', {
      settings: { x: 50, y: 60 },
      github: { x: 10, y: 100 },
      mymusic: { x: 30, y: 200 }
    });

    const positions = store.get('appPositions');
    // @ts-ignore
    expect(positions.settings).toEqual({ x: 50, y: 60 });
  });

  it('should clear and reset to default values', () => {
    store.set('background', 'cat.jpg');
    store.clear();
    expect(store.get('background')).toBe('landscape.jpg');
  });
});
