
import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "./ApiService";
import {EventModel} from "./models/EventModel";
import {CartItemRequest} from "./models/CartItemRequest";
@Component({
    selector: 'eventdetail',
    templateUrl: './templates/eventdetail.html'
})
export class EventDetailComponent {
    public event:EventModel;
    public quantity:number;

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.apiService.getEvent(params['id'])
                .subscribe(m => {
                    this.event = m.model;
                }, e => { this.router.navigateByUrl("/home"); });
        });
    }

    addQuantityToCart() {
        if(this.apiService.isAuthenticated()) {
            let request:CartItemRequest = new CartItemRequest();
            request.quantity = this.quantity;
            request.eventId  =this.event.id;

            this.apiService.addToCart(request)
                .subscribe(m => {
                    this.router.navigateByUrl("/cart");
                }, e => { alert('error'); });



        } else {
            this.router.navigateByUrl('/login');
        }
    }

    constructor(private route: ActivatedRoute, private apiService:ApiService, private router:Router) {
        this.event = new EventModel();
        this.quantity=2;
    }
}