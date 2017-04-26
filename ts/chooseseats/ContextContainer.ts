export class ContextContainer {
    constructor(private ctx: CanvasRenderingContext2D) {

    }

    public getRawContext():CanvasRenderingContext2D {
        return this.ctx;
    }

    public fillPath(innerDraw: (ctx: CanvasRenderingContext2D) => any) {
        this.ctx.beginPath();
        innerDraw(this.ctx);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fill();
    }

    public fillText(text: string, x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillText(text, x, y);
    }
}