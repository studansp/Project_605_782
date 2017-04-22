import { Component } from '@angular/core';
import {EventModel} from "./models/EventModel";
import {ApiService} from "./ApiService";
import {Router} from "@angular/router";
@Component({
    selector: 'events',
    templateUrl: './templates/events.html'
})
export class EventsComponent {
    public events:Array<EventModel>;

    constructor(private apiService:ApiService, router:Router) {
        this.events = new Array<EventModel>();

        apiService.getEvents()
            .subscribe(m => {
                for(var i=0;i<m.model.length;i++) {
                    this.events.push(m.model[i]);
                }
            }, e => { alert('Error'); });
    }
}