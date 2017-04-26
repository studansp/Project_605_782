import {IDrawable} from "./IDrawable";
import {IContains} from "./IContains";
import {ContextContainer} from "./ContextContainer";

export class Seat implements IDrawable, IContains {
    id: number;
    row: number;
    column: number;
    available: boolean;
    selected: boolean;

    private radius = 5;
    private buffer = 15;

    private getCenterX(): number {
        return this.column * this.buffer;
    }

    private getCenterY(): number {
        return this.row * this.buffer;
    }

    draw(ctx: ContextContainer): void {
        if (this.available === false) {
            ctx.getRawContext().fillStyle = "#000000";
        } else if (this.selected) {
            ctx.getRawContext().fillStyle = "#0000ff";
        } else {
            ctx.getRawContext().fillStyle = "#00ff00";
        }

        ctx.fillPath((ctx) => ctx.arc(this.getCenterX(), this.getCenterY(), this.radius, 0, 2 * Math.PI));
    }

    contains(x: number, y: number): boolean {
        var cX = this.getCenterX();
        var cY = this.getCenterY();

        var xDiff = cX - x;
        var yDiff = cY - y;

        return Math.sqrt(xDiff * xDiff + yDiff * yDiff) <= this.radius;
    }
}