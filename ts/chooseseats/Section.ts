import {IDrawable} from "./IDrawable";
import {IContains} from "./IContains";
import {Seat} from "./Seat";
import {ContextContainer} from "./ContextContainer";

export class Section implements IDrawable, IContains {
    id: number;
    name: string;
    seats: Array<Seat>;
    priority: number;

    private height=100;
    private heightAndBuffer=110;
    private width = 200;

    private getMinY(): number {
        return this.priority * this.heightAndBuffer-this.height;
    }

    public draw(ctx: ContextContainer): void {
        ctx.getRawContext().fillStyle = "#000000";

        ctx.fillPath((ctx) => ctx.rect(0, this.getMinY(), this.width, this.height));

        var fontSize = 10;
        var arialAspectRatio = 0.52;
        ctx.getRawContext().fillStyle = "#ffffff";
        ctx.getRawContext().font = fontSize + 'px arial';

        ctx.fillText(this.name, (this.width / 2) - (this.name.length * fontSize / 2) * arialAspectRatio, this.getMinY() + this.height / 2);
    }

    contains(x: number, y: number): boolean {
        return x <= this.width && x >= 0 && y >= this.getMinY() && y <= this.getMinY() + this.height;
    }
}