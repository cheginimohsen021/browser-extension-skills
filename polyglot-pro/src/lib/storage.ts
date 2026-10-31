export type StorageArea = 'local' | 'session';

export interface StorageAdapter<T> {
  get(key: string): Promise<T | undefined>;
  set(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

export class StorageWrapper<T> implements StorageAdapter<T> {
  constructor(private readonly area: StorageArea) {}

  async get(key: string): Promise<T | undefined> {
    const store = await chrome.storage[this.area].get(key);
    return store[key] as T | undefined;
  }

  async set(key: string, value: T): Promise<void> {
    await chrome.storage[this.area].set({ [key]: value });
  }

  async remove(key: string): Promise<void> {
    await chrome.storage[this.area].remove(key);
  }
}

export async function openIndexedDbDatabase(name: string, version = 1): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed.'));
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('translation_memory')) {
        db.createObjectStore('translation_memory', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('subtitles')) {
        db.createObjectStore('subtitles', { keyPath: 'id' });
      }
    };
  });
}
