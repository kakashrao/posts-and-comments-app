import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  setUserId(body: string) {
    localStorage.setItem('userId', body);
  }

  getUserId() {
    const userId = localStorage.getItem('userId');

    if(userId) {
      return userId;
    }

    return null;
  }

  setUserName(body: string) {
    localStorage.setItem('userName', body);
  }

  getUserName() {
    const userName = localStorage.getItem('userName');

    if(userName) {
      return userName;
    }
    return null;
  }

  setUserProfession(body: string) {
    localStorage.setItem('userProfession', body);
  }

  getUserProfession() {
    const userProfession = localStorage.getItem('userProfession');

    if(userProfession) {
      return userProfession;
    }
    return null;
  }

  setUserBio(body: string) {
    localStorage.setItem('userBio', body);
  }

  getUserBio() {
    const userBio = localStorage.getItem('userBio');

    if(userBio) {
      return userBio;
    }
    return null;
  }

  setToken(body: string) {
    localStorage.setItem('token', body);
  }

  getToken() {
    const token = localStorage.getItem('token');

    if(token) {
      return token;
    }
    return null;
  }

  clearAuthData() {
    this.removeFromLocalStorage('userId');
    this.removeFromLocalStorage('userName');
    this.removeFromLocalStorage('userBio');
    this.removeFromLocalStorage('userProfession');
    this.removeFromLocalStorage('token');
  }

  removeFromLocalStorage(body: string) {
    localStorage.removeItem(body);
  }
}
