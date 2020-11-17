import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgePipe } from './../shared/pipes/age';

import { UserDirectoryRoutingModule } from './user-directory-routing.module';
import { UserDirectoryComponent } from './user-directory.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    UserDirectoryComponent,
    UserListingComponent,
    UserSelectionComponent,
    AgePipe,
  ],
  imports: [
    CommonModule,
    UserDirectoryRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  exports: [UserListingComponent, UserSelectionComponent],
})
export class UserDirectoryModule {}
