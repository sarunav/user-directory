import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'user-directory',
    loadChildren: () =>
      import('./user-directory/user-directory.module').then(
        (m) => m.UserDirectoryModule
      ),
  },
  {
    path: 'admin',
    data: {
      role: 'auth',
    },
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
