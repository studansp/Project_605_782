
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "./ApiService";
import {EventModel} from "./models/EventModel";
@Component({
    selector: 'eventdetail',
    templateUrl: './templates/eventdetail.html'
})
export class EventDetailComponent {
    public event:EventModel;

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.apiService.getEvent(params['id'])
                .subscribe(m => {
                    this.event = m.model;
                }, e => { this.router.navigateByUrl("/home"); });
        });
    }

    constructor(private route: ActivatedRoute, private apiService:ApiService, private router:Router) {
        this.event = new EventModel();
    }
}