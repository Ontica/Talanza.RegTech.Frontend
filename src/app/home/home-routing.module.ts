/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '@app/core';

import { MainLayoutComponent } from '@app/shared';

import {
  MultiProjectsMainPageComponent
} from '@app/project-management/multi-projects-main-page/multi-projects-main-page.component';


@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'home', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'pending-tasks', component: MultiProjectsMainPageComponent },
          { path: 'tasks-finder', component: MultiProjectsMainPageComponent },
          { path: 'overall-timelines', component: MultiProjectsMainPageComponent },
          { path: 'documents-store', component: MultiProjectsMainPageComponent },
          { path: '', redirectTo: 'pending-tasks', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class HomeRoutingModule { }
