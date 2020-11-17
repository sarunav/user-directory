import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard.service';

import { AdminComponent } from './admin.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: ChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
