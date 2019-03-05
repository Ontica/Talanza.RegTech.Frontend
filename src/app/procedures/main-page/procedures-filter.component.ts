/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { EntityService, ProcedureService } from '@app/services/regulation';

import { BaseProcedure, Entity, Office, ProcedureFilter } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-procedure-filter',
  templateUrl: './procedures-filter.component.html',
  styleUrls: ['./procedures-filter.component.scss']
})
export class ProcedureFilterComponent implements OnInit {

  filter = new ProcedureFilter();

  offices: Office[] = [];
  entities: Entity[] = [];
  themesList: string[] = [];

  @Output() change = new EventEmitter<BaseProcedure[]>();


  constructor(private procedureService: ProcedureService,
              private authorityService: EntityService) { }


  ngOnInit() {
    this.setEntities();
    this.setThemesList();
    this.onChangeFilter();
  }


  onChangeFilter() {
    this.procedureService.getProceduresList(this.filter)
                         .then(x => this.change.emit(x));
  }


  onCleanCombos() {
    this.filter.clean();
    this.change.emit([]);
  }


  private setEntities(): void {
    this.authorityService.getEntities()
                         .then(x => this.entities = x);
  }


  private setThemesList(): void {
    this.procedureService.getThemes()
                         .toPromise()
                         .then(x => this.themesList = x);
  }

}
