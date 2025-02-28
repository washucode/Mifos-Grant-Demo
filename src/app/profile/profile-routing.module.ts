/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Custom Components */
import { ProfileComponent } from './profile.component';

/** Profile Routes */
const routes: Routes = [
  Route.withShell([
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: 'Profile', breadcrumb: 'Profile' }
    }
  ])

];

/**
 * Profile Routing Module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule {}
