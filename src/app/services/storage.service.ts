import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setInLocalStorage(key: string, body: string) {
    localStorage.setItem(key, body);
  }

  getFromLocalStorage(key: string) {
    const userId = localStorage.getItem(key);

    if (userId) {
      return userId;
    }

    return null;
  }

  clearAuthData() {
    localStorage.clear();
  }

  removeFromLocalStorage(body: string) {
    localStorage.removeItem(body);
  }
}
