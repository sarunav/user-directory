import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Users } from '../../shared/interface/users';

import * as moment from 'moment';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() selectedTableData: any = new EventEmitter();

  displayedColumns: string[] = [
    'select',
    'position',
    'userName',
    'phoneNumber',
    'dob',
  ];
  ageFilter = [
    { value: 'all', viewValue: 'All' },

    { value: 'less-than-18', viewValue: 'Less than or equal to 18' },
    {
      value: 'greater-than-18-less-than-56',
      viewValue: 'Geater than 18 & less than 56',
    },
    { value: 'greater-than-56', viewValue: 'Greater than 56' },
  ];
  dataSource: MatTableDataSource<Users[]>;
  selection = new SelectionModel<Users[]>(true, []);
  selectedData: Users[] = [];
  copyOfUserData = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.sharedService.getUsers().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.users);
      this.copyOfUserData = res.users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('users---', res.users);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): any {
    const numSelected = this.selection.selected.length;

    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Push single selected data to an array
  addSelectedData(data: any): void {
    this.selectedData.push(data);
    this.selectedTableData.emit(this.selectedData);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
          this.selection.select(row);
        });
    this.selectedTableData.emit(this.selection.selected);
  }

  singleSelected(event: any, row: any): void {
    event.stopPropagation();
    this.addSelectedData(row);
  }

  filterAge(selectedValue: any): void {
    this.sharedService.clearSelectedData();
    const arr = [];
    this.copyOfUserData.filter((item: any) => {
      // Get age in years
      const age = moment().diff(item.dob, 'years');

      // Dropdown conditions
      if (selectedValue === 'all') {
        arr.push(item);
        this.filteredData(arr);
      }
      if (selectedValue === 'less-than-18') {
        if (age < 18 || age === 18) {
          arr.push(item);
          this.filteredData(arr);
        } else {
          this.filteredData([]);
        }
      }
      if (selectedValue === 'greater-than-18-less-than-56') {
        if ((age > 18 || age === 18) && (age < 56 || age === 56)) {
          arr.push(item);
          this.filteredData(arr);
        }
      }
      if (selectedValue === 'greater-than-56') {
        if (age === 56 || age > 56) {
          arr.push(item);
          this.filteredData(arr);
        }
      }
    });
  }

  filteredData(data: any): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
