import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDirectoryComponent } from './user-directory.component';
import { UserListingComponent } from './user-listing/user-listing.component';

const routes: Routes = [
  { path: '', component: UserDirectoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDirectoryRoutingModule { }
