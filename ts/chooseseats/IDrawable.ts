import {ContextContainer} from "./ContextContainer";
export interface IDrawable {
    draw(ctx: ContextContainer): void;
}