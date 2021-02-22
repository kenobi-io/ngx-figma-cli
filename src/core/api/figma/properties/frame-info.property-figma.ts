/** Data on the frame a component resides in */
export interface FrameInfoPropertyFigma {
    /** Id of the frame node within the figma file */
    node_id: string;
    /** Name of the frame */
    name: string;
    /** Background color of the frame */
    background_color: string;
    /** Id of the frame's residing page */
    page_id: string;
    /** Name of the frame's residing page */
    page_name: string;
}
