import {Component} from "@angular/core";
import {Section} from "./chooseseats/Section";
import {Seat} from "./chooseseats/Seat";
import {MouseHandler} from "./chooseseats/MouseHandler";
import {ContextContainer} from "./chooseseats/ContextContainer";
import {IContains} from "./chooseseats/IContains";
import {IDrawable} from "./chooseseats/IDrawable";

@Component({
    selector: 'chooseyourseats',
    templateUrl: './templates/chooseyourseats.html'
})

export class ChooseYourSeatsComponent {
    private sections: Section[];
    private selectedSection: Section;
    private seats: Seat[];
    private canvas: HTMLCanvasElement;
    private ctx: ContextContainer;
    private canvasId = "seatsCanvas";
    private mouseHandler: MouseHandler;
    private selectedSeats: Set<Seat> = new Set<Seat>();

    ngOnInit() {
        this.sections = this.getSections();
        this.canvas = <HTMLCanvasElement>(document.getElementById(this.canvasId));
        this.ctx = new ContextContainer(this.canvas.getContext("2d"));

        this.mouseHandler = new MouseHandler(this.canvas, (ev: PointerEvent) => this.handleCanvasClick(ev));

        this.start();
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

    private fillSeats(): void {
        this.seats = this.getSeatsForSection(this.selectedSection.id);
    }

    private getSeatsForSection(id: number): Seat[] {
        var rows = 50;
        var columns = 50;
        var currentId = 1;

        var seats = new Array<Seat>(rows * columns);

        for (var row = 0; row < rows; row++) {
            for (var column = 0; column < columns; column++) {
                var currentSeat = new Seat();
                currentSeat.id = currentId++;
                currentSeat.row = row;
                currentSeat.column = column;
                seats[column + columns * row] = currentSeat;
            }
        }

        return seats;
    }

    private getSections(): Section[] {
        var section1 = new Section();

        section1.id = 1;
        section1.name = "Section 1";
        section1.priority = 1;

        var section2 = new Section();

        section2.id = 2;
        section2.name = "Section 2";
        section2.priority = 2;

        var section3 = new Section();

        section3.id = 3;
        section3.name = "Section 3";
        section3.priority = 3;

        return [section1, section2, section3];
    }
}