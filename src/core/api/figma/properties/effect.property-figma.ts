import { EffectEnum, BlendModeEnum } from "./enums.property-figma";
import { ColorPropertyFigma } from "./color.property-figma";
import { VectorPropertyFigma } from "./vector.property-figma";
export interface EffectPropertyFigma {
    type: EffectEnum;
    /** Is the effect active? */
    visible: boolean;
    /** Radius of the blur effect (applies to shadows as well) */
    radius: number;
    /** The color of the shadow */
    color: ColorPropertyFigma;
    /** Blend mode of the shadow */
    blendMode: BlendModeEnum;
    /** How far the shadow is projected in the x and y directions */
    offset: VectorPropertyFigma;
}
