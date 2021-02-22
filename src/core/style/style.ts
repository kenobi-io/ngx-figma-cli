import { 
    ColorPropertyFigma, 
    PaintPropertyFigma,
    EffectPropertyFigma
} from "../api";

export class Style extends CSSStyleDeclaration{

    public colorToString(color: ColorPropertyFigma | any): string {
        return `rgba(${Math.round(color.r * 255)},
            ${Math.round(color.g * 255)},
            ${Math.round(color.b * 255)},
            ${color.a})`;
    }

    public paintToRadialGradient(paint: PaintPropertyFigma): string {
        const stops = paint.gradientStops.map((stop: { color: any; position: number; }) => {
            return `${this.colorToString(stop.color)} 
                    ${Math.round(stop.position * 60)}%`;
        }).join(', ');

        return `radial-gradient(${stops})`;
    }

    public paintToLinearGradient(paint: PaintPropertyFigma): string {
        const handles = paint.gradientHandlePositions;
        const handle0 = handles[0];
        const handle1 = handles[1];

        const ydiff = handle1.y - handle0.y;
        const xdiff = handle0.x - handle1.x;

        const angle = Math.atan2(-xdiff, -ydiff);
        const stops = paint.gradientStops
            .map((stop: { color: any; position: number; }) => {
                return `${this.colorToString(stop.color)}
                        ${Math.round(stop.position * 100)}%`;
            }).join(', ');

        return `linear-gradient(${angle}rad, ${stops})`;
    }

    public dropShadow(effect: EffectPropertyFigma): string {
        return `${effect.offset.x}px
            ${effect.offset.y}px 
            ${effect.radius}px 
            ${this.colorToString(effect.color)}`;
    }

    public innerShadow(effect: EffectPropertyFigma): string {
        return `inset ${effect.offset.x} px 
            ${effect.offset.y} px 
            ${effect.radius} px 
            ${this.colorToString(effect.color)}`;
    }

    public imageUrl(hash: string): string {
        const squash = hash.split('-').join('');
        return `url(https://s3-us-west-2.amazonaws.com/figma-alpha/img/${squash.substring(0, 4)}/${squash.substring(4, 8)}/${squash.substring(8)})`;
    }

    public backgroundSizeIsFill(scaleMode: string): string | undefined {
        if (scaleMode === 'FILL') {
            return 'cover';
        }
        return undefined;
    }

    public getPaint(paintList: PaintPropertyFigma[]): PaintPropertyFigma | null {
        if (paintList && paintList.length > 0) {
            return paintList[paintList.length - 1];
        }
        return null;
    }
}