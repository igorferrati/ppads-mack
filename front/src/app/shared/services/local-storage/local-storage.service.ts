import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /**
   * Seta item no localStorage
   * @param key
   * @param value
   */
  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtem item do localStorage
   * @param key
   * @returns
   */
  public getItem(key: string): string | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Remove item do localStorage
   * @param key
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Limpa localStorage
   */
  public clearLocalStorage(): void {
    localStorage.clear();
  }
}
