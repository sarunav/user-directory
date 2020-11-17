import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Users } from './../../shared/interface/users';

import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  users: Users[] = [];
  chartOption: EChartOption = {};

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  setChartData(): void {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: this.getUserNames(),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.getYearOfBirth(),
          type: 'line',
        },
      ],
    };
  }

  // Get user names array
  getUserNames(): any {
    const data = this.users.map((item: Users) => {
      return item.userName;
    });

    return data;
  }

  // Get birth year array
  getYearOfBirth(): any {
    const data = this.users.map((item: Users) => {
      const age = moment().diff(item.dob, 'years');
      return age;
    });

    return data;
  }

  // Get Users json from assets folder
  getUsers(): void {
    this.sharedService.getUsers().subscribe((res: any) => {
      this.users = res.users;
      this.setChartData();
    });
  }
}
