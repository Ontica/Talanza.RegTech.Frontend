/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { AfterContentInit, Component, ElementRef,
         EventEmitter, Input, OnChanges,
         OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

import { Command, EventInfo } from '@app/core/data-types';

import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';


@Component({
  selector: 'emp-steps-bpmn-modeler',
  template:
    `<div #ref class="diagram-container"></div>`,
  styles: [`
    .diagram-container {
      height: calc(100vh - 270px);
      width: 100%;
    }`
  ]
})
export class BpmnModelerComponent implements AfterContentInit, OnDestroy, OnChanges {

  @Input() xml: string;

  @Input() execute: Command;

  @Output() bpmnModelerEvent = new EventEmitter<EventInfo>();

  @Output() bpmnModelerError = new EventEmitter<any>();

  @ViewChild('ref', { static: true }) private el: ElementRef;

  private modeler: BpmnJS = new BpmnJS();


  constructor() {
    this.attachBpmnJSEvents();
  }


  ngAfterContentInit() {
    this.modeler.attachTo(this.el.nativeElement);
  }


  ngOnDestroy() {
    this.modeler.destroy();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['xml']) {
      this.modeler.importXML(this.xml, null);

    } else if (changes['execute']) {
      this.executeAction(changes['execute'].currentValue as Command);

    }
  }

  // private methods


  private attachBpmnJSEvents() {
    this.onImportXML();
    this.onEventBusEvents();
  }


  private executeAction(command: Command) {
    if (!command) {
      return;
    }

    switch (command.type) {
      case 'save':
        this.save();
        return;
    }
  }


  private onEventBusEvents() {
    const eventBus = this.modeler.get('eventBus');

    eventBus.on('element.dblclick', function(e) {
      console.log(event, 'on', e.element.id, e.element);
    });

  }


  private onImportXML() {
    this.modeler.on('import.done', ({ err }) => {
      if (!err) {
        this.modeler.get('canvas').zoom('fit-viewport');
      } else {
        this.bpmnModelerError.emit(err);
      }
    });
  }


  private save() {
    this.modeler.saveXML((err: any, xml: any) => {
      if (!err) {
        const eventInfo: EventInfo = {
          type: 'save',
          payload: { xml: xml }
        };

        this.bpmnModelerEvent.emit(eventInfo);

      } else {
        this.bpmnModelerError.emit(err);
      }
    });
  }

}
