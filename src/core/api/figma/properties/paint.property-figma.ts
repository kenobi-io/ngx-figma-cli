import { BlendModes, TypePaints, ScaleModePaints } from "./enums.property-figma";
import { ColorPropertyFigma } from "./color.property-figma";
import { TransformPropertyFigma } from "./transform.property-figma";
import { ColorStopPropertyFigma } from "./color-stop.property-figma";
import { VectorPropertyFigma } from "./vector.property-figma";
/** A solid color, gradient, or image texture that
 *  can be applied as fills or strokes */
export interface PaintPropertyFigma {
    type: TypePaints;
    /** `default: true` Is the paint enabled? */
    visible?: boolean;
    /** `default: 1` Overall opacity of paint
     *  (colors within the paint can also have opacity
     * values which would blend with this) */
    opacity?: number;
    /** Image scaling mode */
    scaleMode: ScaleModePaints;
    /** Image reference, get it with `Api.getImage` */
    imageRef: string;
    /** Affine transform applied to the image, only present if scaleMode is STRETCH */
    imageTransform?: TransformPropertyFigma;
    /** Amount image is scaled by in tiling, only present if scaleMode is TILE */
    scalingFactor?: number;
    /**
    * How this node blends with nodes behind it in the scene (see blend mode section for more details)
    */
    blendMode: BlendModes;
    /**
     * This field contains three vectors, each of which are a position
     * in normalized object space (normalized object space is if the
     * top left corner of the bounding box of the object is (0, 0)
     * and the bottom right is (1,1)). The first position corresponds
     *  to the start of the gradient (value 0 for the purposes of
     *  calculating gradient stops), the second position is the end
     *  of the gradient (value 1), and the third handle position
     * determines the width of the gradient (only relevant for non-linear gradients).
     */
    gradientHandlePositions: VectorPropertyFigma[];
    /**
     * Positions of key points along the gradient axis with the
     * colors anchored there. Colors along the gradient are
     * interpolated smoothly between neighboring gradient stops.
     */
    gradientStops: ColorStopPropertyFigma[];
    color: ColorPropertyFigma;
    gifRef: string;
}
