/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { Procedure } from '@app/models/regulation';


@Component({
  selector: 'emp-gov-pv-general-info',
  templateUrl: './pv-general-info.component.html',
  styleUrls: ['./pv-general-info.component.scss']
})
export class PVGeneralInfoComponent {

  editionMode = false;
  isVisibleGeneralInfo = true;
  isVisibleObligationsInfo = true;
  isInitialTermsVisible = true;
  isPaymentInfoVisible = true;
  isAuthorityInfoVisible = true;

  @Input()
  get procedure() { return this._procedure; }
  set procedure(procedure: Procedure) {
    if (!procedure) {
      return;
    }
    this._procedure = procedure;
  }
  private _procedure: Procedure;


  onDisplayGeneralInfo() {
    this.isVisibleGeneralInfo = !this.isVisibleGeneralInfo;
  }


  onDisplayObligationsInfo() {
    this.isVisibleObligationsInfo = !this.isVisibleObligationsInfo;
  }


  onDisplayInitialTerms() {
    this.isInitialTermsVisible = !this.isInitialTermsVisible;
  }


  onDisplayPaymentInfo() {
    this.isPaymentInfoVisible = !this.isPaymentInfoVisible;
  }


  onDisplayAuthorityInfo() {
    this.isAuthorityInfoVisible = !this.isAuthorityInfoVisible;
  }


  openExternalWindow(url: string) {
    if (!url.startsWith('http')) {
      url = 'http://' + url;
    }
    window.open(url, '_blank', 'location=yes,height=570,width=620,scrollbars=yes,status=yes');
  }

}
