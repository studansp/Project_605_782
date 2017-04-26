export class MouseHandler {
    private didMove: boolean;
    private clicking: boolean = false;

    private clickX: number;
    private clickY: number;

    private offsetX: number = 0;
    private offsetY: number = 0;

    public clearOffset(): void {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    public getOffsetX(): number {
        return this.offsetX;
    }

    public getOffsetY(): number {
        return this.offsetY;
    }

    constructor(private canvas: HTMLCanvasElement, private clickListener:(ev:MouseEvent)=>any) {
        this.canvas.addEventListener('mousedown', (ev: PointerEvent) => this.mouseDown(ev));
        this.canvas.addEventListener('mousemove', (ev: PointerEvent) => this.mouseMove(ev));
        this.canvas.addEventListener('mouseleave', (ev: PointerEvent) => this.mouseUp(ev));
        this.canvas.addEventListener('mouseup', (ev: PointerEvent) => this.mouseUp(ev));
    }

    private mouseDown(pointerEvent: PointerEvent) {
        this.didMove = false;
        this.clicking = true;

        this.clickX = pointerEvent.clientX;
        this.clickY = pointerEvent.clientY;
    }

    private mouseUp(pointerEvent: PointerEvent) {
        this.clicking = false;

        if (this.didMove === false) {
            this.clickListener(pointerEvent);
        } else {
            this.mouseMove(pointerEvent);
        }
    }

    private mouseMove(pointerEvent: PointerEvent) {
        if (this.clicking) {
            this.didMove = true;

            this.offsetX -= (this.clickX - pointerEvent.clientX);
            this.offsetY -= (this.clickY - pointerEvent.clientY);

            this.clickX = pointerEvent.clientX;
            this.clickY = pointerEvent.clientY;
        }
    }
}