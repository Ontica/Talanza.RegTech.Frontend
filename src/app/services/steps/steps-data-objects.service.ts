/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService, Assertion } from '@app/core';

import { DataObject, DataObjectSource } from '@app/models/steps';
import { ProjectItem } from '@app/models/project-management';


@Injectable()
export class StepsDataObjectsService {

  constructor(private http: HttpService) { }


  getActionDataObjects(actionUID: string): Observable<DataObject[]> {
    Assertion.assertValue(actionUID, 'actionUID');

    const path = `v3/empiria-steps/actions/${actionUID}/data-objects`;

    return this.http.get<DataObject[]>(path);
  }


  getDataObjects(stepUID: string): Observable<DataObject[]> {
    Assertion.assertValue(stepUID, 'stepUID');

    const path = `v3/empiria-steps/steps/${stepUID}/data-objects`;

    return this.http.get<DataObject[]>(path);
  }


  getDataSources(): Observable<DataObjectSource[]> {
    const path = `v3/empiria-steps/data-objects/data-sources`;

    return this.http.get<DataObjectSource[]>(path);
  }


  linkStepWithDataSource(step: ProjectItem, dataSource: DataObjectSource): Observable<DataObject> {
    const path = `v3/empiria-steps/steps/${step.uid}/data-objects`;

    const body = {
      dataSourceUID: dataSource.uid
    };

    return this.http.post<DataObject>(path, body);
  }

}
