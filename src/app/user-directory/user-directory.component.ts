import { Component, OnInit } from '@angular/core';
import { Users } from './../shared/interface/users';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-user-directory',
  templateUrl: './user-directory.component.html',
  styleUrls: ['./user-directory.component.scss'],
})
export class UserDirectoryComponent implements OnInit {
  userSelection: Users[];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  // Emitted data from User Listing component
  tableSelected(emittedData: any): any {
    this.userSelection = emittedData;

    // Saving data to a User data Subject
    this.sharedService.sendUserSelections(emittedData);
  }
}
