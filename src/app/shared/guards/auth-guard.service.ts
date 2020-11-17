import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sharedData: SharedService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const getLocalData = this.sharedData.getLocalData();

    if (getLocalData) {
      const sum = getLocalData.sum;
      const value = getLocalData.value;
      const success = sum === value ? true : false;
      if (success) {
        return true;
      } else {
        this.router.navigate(['/admin/chart']);
      }
    } else {
      return false;
    }
  }
}
