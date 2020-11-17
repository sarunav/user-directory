import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/shared/interface/users';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss'],
})
export class UserSelectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  users: Users[] = [];

  constructor(private sharedService: SharedService) {
    // Subscribing to the User data Subject
    this.subscription = this.sharedService
      .getUserSelectedData()
      .subscribe((data: Users[]) => {
        this.users = data;
      });
  }

  ngOnInit(): void {}

  // Unsubscribing subscription on component destroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
