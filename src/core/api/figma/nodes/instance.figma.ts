import { FrameFigma } from "./frame.figma";
/** An instance of a component, changes to the component result in the same changes applied to the instance */
export interface InstanceFigma extends FrameFigma {
    /** ID of component that this instance came from, refers to components table (see endpoints section below) */
    componentId: string;
}
