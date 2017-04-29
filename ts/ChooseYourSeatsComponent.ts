import {Component} from "@angular/core";
import {Seat} from "./chooseseats/Seat";
import {MouseHandler} from "./chooseseats/MouseHandler";
import {ContextContainer} from "./chooseseats/ContextContainer";
import {IContains} from "./chooseseats/IContains";
import {IDrawable} from "./chooseseats/IDrawable";
import {ApiService} from "./ApiService";
import {SectionModel} from "./models/SectionModel";
import {CartItemRequest} from "./models/CartItemRequest";
import {TicketModel} from "./models/TicketModel";
import {Router} from "@angular/router";

@Component({
    selector: 'chooseyourseats',
    templateUrl: './templates/chooseyourseats.html'
})

export class ChooseYourSeatsComponent {
    private sections: SectionModel[] = [];
    public eventId:number;
    private selectedSection: SectionModel;
    private seats: Seat[] = [];
    private canvas: HTMLCanvasElement;
    private ctx: ContextContainer;
    private canvasId = "seatsCanvas";
    private mouseHandler: MouseHandler;
    private selectedSeats: Set<Seat> = new Set<Seat>();

    constructor(private apiService:ApiService, private router:Router) {
    }

    ngOnInit() {
        this.canvas = <HTMLCanvasElement>(document.getElementById(this.canvasId));
        this.ctx = new ContextContainer(this.canvas.getContext("2d"));

        this.mouseHandler = new MouseHandler(this.canvas, (ev: PointerEvent) => this.handleCanvasClick(ev));

        this.apiService.getSections()
            .subscribe(m => {
                for(var i=0;i<m.model.length;i++) {
                    var section:SectionModel = new SectionModel();
                    section.name = m.model[i].name;
                    section.id = m.model[i].id;
                    section.priority = i+1;
                    this.sections.push(section);
                }

                this.start();
            }, e => {alert('Unable to retrieve sections.'); });
    }

    public start(): void {
        setInterval(() => {
                this.draw();
            },
            100);
    }

    private getFirstContains<T extends IContains>(arg: T[], x:number, y:number): T {
        for (var i = 0; i < arg.length; i++) {
            var toCheck = arg[i];

            if (toCheck.contains(x, y))
                return toCheck;
        }
        return null;
    }

    private handleSectionViewClick(x:number, y:number): void {
        var resultSection = this.getFirstContains(this.sections, x, y);

        if (resultSection != null) {
            this.mouseHandler.clearOffset();
            this.selectedSection = resultSection;
            this.fillSeats();
        }
    }

    private backButtonSize:number=50;

    private handleSeatViewClick(x: number, y: number): void {
        var backX = x+this.mouseHandler.getOffsetX();
        var backY = y+this.mouseHandler.getOffsetY();

        if (backX >= 0 && backX <= this.backButtonSize &&
            backY >= 0 && backY <= this.backButtonSize) {
            this.mouseHandler.clearOffset();
            this.selectedSeats.clear();
            this.selectedSection = null;
        } else {
            var resultSeat = this.getFirstContains(this.seats, x, y);

            if (resultSeat != null) {
                var newSelected = !resultSeat.selected;
                resultSeat.selected = newSelected;

                if (newSelected) {
                    this.selectedSeats.add(resultSeat);
                } else {
                    this.selectedSeats.delete(resultSeat);
                }
            }
        }
    }

    private handleCanvasClick(pointerEvent: PointerEvent) {
        var x = pointerEvent.pageX-this.canvas.offsetLeft - this.mouseHandler.getOffsetX();
        var y = pointerEvent.pageY-this.canvas.offsetTop - this.mouseHandler.getOffsetY();

        if (this.selectedSection == null) {
            this.handleSectionViewClick(x, y);

        } else {
            this.handleSeatViewClick(x, y);
        }
    }

    private drawArray(toDraw: IDrawable[]): void {
        for (var i = 0; i < toDraw.length; i++) {
            toDraw[i].draw(this.ctx);
        }
    }

    private drawOverlay(): void {
        if (this.selectedSection != null) {

            this.ctx.getRawContext().fillStyle = "#ff0000";
            this.ctx.fillPath((ctx: CanvasRenderingContext2D) => ctx.rect(0, 0, this.backButtonSize, this.backButtonSize));

            this.ctx.getRawContext().fillStyle = "#ffffff";
            this.ctx.getRawContext().font = '10px arial';

            this.ctx.fillText("Back", this.backButtonSize / 2 - 10, this.backButtonSize / 2 + 5);
        }
    }

    private draw(): void {
        this.ctx.getRawContext().clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.getRawContext().save();

        this.ctx.getRawContext().translate(this.mouseHandler.getOffsetX(), this.mouseHandler.getOffsetY());

        if (this.selectedSection == null) {
            this.drawArray(this.sections);
        } else {
            this.drawArray(this.seats);
        }

        this.ctx.getRawContext().restore();
        this.drawOverlay();
    }

    public addToCart():void {
        if(this.selectedSeats.size==0) {
            alert('You must select at least one seat');
        } else {
            var request = new CartItemRequest();
            var tickets = new Array<TicketModel>();

            this.selectedSeats.forEach(function(seat){
                var ticket:TicketModel = new TicketModel();
                ticket.id = seat.id;
                tickets.push(ticket);
            });

            request.tickets = tickets;

            this.apiService.addToCart(request)
                .subscribe(m => {
                    this.router.navigateByUrl("/cart");
                }, e => { alert('error'); });
        }
    }

    private fillSeats(): void {
        while(this.seats.length!=0)
            this.seats.pop()

        this.apiService.getSeatsForSection(this.selectedSection.id, this.eventId)
            .subscribe(m => {
                for(var i=0;i<m.model.length;i++) {
                    var seat:Seat = new Seat();
                    seat.id=m.model[i].id;
                    seat.row=m.model[i].row;
                    seat.seat=m.model[i].seat;
                    seat.available=m.model[i].available;

                    this.seats.push(seat);
                }



            }, e => {alert('Unable to retrieve seats.'); });
    }
}