/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProjectsMainPageComponent } from './main-page/projects-main-page.component';
import { GanttComponent } from './components/gantt.component';
import { ProjectEditorComponent } from './activity-editor/project-editor.component';
import { ProjectAddActivityComponent} from './activity-editor/tabs/project-add-activity.component';
import { ProjectStartActivityComponent } from './activity-editor/tabs/project-start-activity.component';
import { ProjectAssignTasksComponent } from './activity-editor/tabs/project-assign-tasks.component';

import { ActivityEditorComponent } from './activity/activity-editor.component';
import { ActivitySelectorComponent } from './activity/activity-selector.component';

import { ProjectsRoutingModule } from './projects-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [ProjectsRoutingModule, SharedModule, CommonModule, FormsModule],
  declarations: [ProjectsMainPageComponent, GanttComponent, ProjectEditorComponent,
                 ProjectAddActivityComponent, ProjectStartActivityComponent,
                 ProjectAssignTasksComponent, ActivityEditorComponent, ActivitySelectorComponent],
  exports: [ProjectsMainPageComponent]
})
export class ProjectsModule { }
