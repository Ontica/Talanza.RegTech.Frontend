/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import {
  Component, EventEmitter, HostBinding, Input, Output, OnInit
} from '@angular/core';

import { Contract, ContractClause } from '../data-types/contract';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'contract-editor',
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.scss'],
  providers: [ContractService]
})

export class ContractEditorComponent implements OnInit {
  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Input() public contractClause: ContractClause;
  @Output() public onCloseEvent = new EventEmitter();

  public currentSelectedTab = 'general-info-tab';
  public isDisabled = false;
  public title = '';

  constructor(private contractService: ContractService) { }

  public ngOnInit() {
    this.setInitialSettings();
  }

  public setSaveOperations(): void {
    this.setTitle();
    this.enableTabs();
  }

  public changeTab(newSelectedTab: string): void {
    this.currentSelectedTab = newSelectedTab;
  }

  public close(): void {
    this.onCloseEvent.emit();
  }

  private disableTabs(): void {
    this.isDisabled = true;
  }

  private enableTabs(): void {
    this.isDisabled = false;
  }

  private setInitialSettings(): void {
    if (this.contractClause.uid === '') {
      this.disableTabs();
    } else {
      this.setTitle();
    }
  }

  private async setTitle() {
    if (this.contractClause.uid === '') {
      this.title = 'Nueva claúsula o anexo';
    } else {
      let clause = await this.getClause();
      this.title = clause.clauseNo + ' ' + clause.title;
    }
  }

  private getClause(): Promise<ContractClause> {
    return this.contractService.getClause(this.contractClause.contractUID,
                                          this.contractClause.uid);
  }

}
