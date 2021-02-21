import { VectorPropertyFigma } from "./vector.property-figma";
/** A relative offset within a frame */
export interface FrameOffsetPropertyFigma {
    /** Unique id specifying the frame */
    node_id: string;
    /** 2d vector offset within the frame */
    node_offset: VectorPropertyFigma;
}
