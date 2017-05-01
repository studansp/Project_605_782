
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "./ApiService";
import {EventModel} from "./models/EventModel";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'eventedit',
    templateUrl: './templates/eventedit.html'
})
export class EventEditComponent {
    public model:EventModel;

    ngOnInit() {
        if(this.apiService.isAuthenticated()==false || this.apiService.getAccount().admin==false) {
            this.router.navigateByUrl('/login');
        } else {
            this.route.params.subscribe(params => {
                this.apiService.getEvent(params['id'])
                    .subscribe(m => {
                        this.model = m.model;
                    }, e => { this.router.navigateByUrl("/home"); });
            });

        }
    }

    public save():void {
        this.apiService.updateEvent(this.model)
            .subscribe(m => {
                this.model = m.model;
            }, e => { alert('Invalid event'); });
    }

    public getDate(date:any) {
        var parsed = Date.parse(date);

        if(isNaN(parsed))
            return date;

        return parsed;
    }

    constructor(private route: ActivatedRoute, private apiService:ApiService, private router:Router) {
        this.model = new EventModel();
    }
}