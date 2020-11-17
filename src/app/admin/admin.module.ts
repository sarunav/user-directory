import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ChartComponent } from './chart/chart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

@NgModule({
  declarations: [AdminComponent, ChartComponent, AdminPanelComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
})
export class AdminModule {}
