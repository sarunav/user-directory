import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Users } from '../interface/users';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private jsonUrl = '../../../assets/data/users.json';
  private userData = new Subject<any>();
  isLoading = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // Get all users
  public getUsers(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }

  // Set User selection
  sendUserSelections(data: Users[]): void {
    this.userData.next(data);
  }

  // Get User selections
  getUserSelectedData(): Observable<Users[]> {
    return this.userData.asObservable();
  }

  // Remove data
  clearSelectedData(): void {
    this.userData.next();
  }

  // Get data from LS
  getLocalData(): any {
    return JSON.parse(localStorage.getItem('data'));
  }

  // Show loading spinner
  showLoader(): void {
    this.isLoading.next(true);
  }

  // Hide loading spinner
  hideLoader(): void {
    this.isLoading.next(false);
  }
}
