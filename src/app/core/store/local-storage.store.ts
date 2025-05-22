export abstract class LocalStorageStore<T> {
  appKey = "shukaaa-os"
  abstract storeKey: string;
  abstract defaultValue: T;

  get(key: keyof T): T[keyof T] {
    if (!localStorage.getItem(this.appKey + this.storeKey)) {
      localStorage.setItem(this.appKey + this.storeKey, JSON.stringify(this.defaultValue));
    }

    const json = JSON.parse(localStorage.getItem(this.appKey + this.storeKey)!!) as T;
    return json[key];
  }

  set(key: keyof T, value: T[keyof T]) {
    let json = localStorage.getItem(this.appKey + this.storeKey);

    if (!json) {
      json = JSON.stringify(this.defaultValue);
      localStorage.setItem(this.appKey + this.storeKey, json);
    }

    const parsed = JSON.parse(json) as T;
    parsed[key] = value;

    localStorage.setItem(this.appKey + this.storeKey, JSON.stringify(parsed));
  }

  clear() {
    localStorage.removeItem(this.appKey + this.storeKey);
  }
}
