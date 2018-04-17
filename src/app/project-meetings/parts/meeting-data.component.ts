/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Ticket, EmptyTicket } from '../data-types/ticket';
import { TicketService } from '../services/ticket.service';

@Component({
    selector: 'meeting-data',
    templateUrl: './meeting-data.component.html',
    styleUrls: ['./meeting-data.component.scss'],
    providers:[TicketService]
})

export class MeetingDataComponent {
    
    public ticket = EmptyTicket();
    public isMeetingData = false;

    private _ticketUID: string = "";
    @Input() 
    set ticketUID(ticketUID: string) {
        this._ticketUID = ticketUID;       
       if ((ticketUID === '') || (ticketUID === undefined) || (!ticketUID)) {
            return;
       }
       this.loadTicket();
       
    }
    get ticketUID(): string {
        return this._ticketUID;
    }

    @Output() onLoadProjectMeeting = new EventEmitter<Ticket>();

    constructor(private ticketService: TicketService) {}

    public async addMeetingData() {
        if (!this.validate()) {
            return;
        }

        await this.saveMeetingData();
        
        this.isMeetingData = true;
        
    }

    private validate(): boolean {
        if (this.ticket.title === '') {
            alert("El nombre de la reunión se encuentra en blanco");
            return false;
        }
        return true;
    }
    
    private async saveMeetingData() {
      await  this.ticketService.addTicket(this.ticket)
                          .subscribe((x) => {  this.isMeetingData = true;
                                               this.onLoadProjectMeeting.emit(x); 
                                            });           
    }
    
    private async loadTicket() {
        this.ticketService.getTicket(this.ticketUID)
                          .subscribe((x)=> { this.ticket = x;
                                             this.onLoadProjectMeeting.emit(x);
                                           });
    }

}